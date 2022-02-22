import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AddUserDialogComponent } from "../../modals/add-user-dialog/add-user-dialog.component";
import { InfoDialogComponent } from "../../modals/info-dialog/info-dialog.component";
import {
  DeleteConversationDialogComponent
} from "../../modals/delete-conversation-dialog/delete-conversation-dialog.component";
import { CreateConversationComponent } from "../../modals/create-conversation/create-conversation.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../../../services/auth.service";
import { ProjectService } from "../../../services/project.service";
import { SocketService } from "../../../services/socket.service";
import { notificationConfig } from "../../../configs/matSnackbarConfig";
import { IConversation, IResponse, IUser } from "../../../interfaces/interface";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {
  public conversations$ = new BehaviorSubject<IConversation[]>([]);
  private userId: string;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private socketService: SocketService,
    private router: Router,
    private dialog: MatDialog,
    private notification: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.userId;
    this.getConversations();

    this.projectService.conversation$.subscribe(conversation => {
      this.pushNewConversationIfCurrentUserIsContributor(conversation);
    });

    this.projectService.deletedConversationId$.subscribe(conversationId => {
      this.deleteConversationIfCurrentUserIsContributor(conversationId);
    });
  }

  getConversations(): void {
    this.projectService.getConversations().subscribe((res: IResponse) => {
      this.setConversations(res.message);
    });
  }

  pushNewConversationIfCurrentUserIsContributor(conversation: IConversation): void {
    const isContributorCurrentUser = conversation.contributors?.find((user: IUser) => user.id === this.userId);
    const isConversationExistOnPage = this.conversations$.getValue().find(conv => conv.id === conversation.id);

    if (isContributorCurrentUser) {
      if (!isConversationExistOnPage) {
        this.conversations$.next([...this.conversations$.getValue(), conversation]);
      } else {
        const modifiedConversations = this.conversations$.getValue().map(conv => {
          if (conv.id === conversation.id) {
            conv = conversation;
          }
          return conv;
        });
        this.conversations$.next(modifiedConversations);
      }
    }
  }

  deleteConversationIfCurrentUserIsContributor(conversationId: string): void {
    const modifiedConversations = this.conversations$.getValue().filter(conv => conv.id !== conversationId);
    this.conversations$.next(modifiedConversations);
  }

  setConversations(conversations: any): void {
    const filteredConversations = this.projectService.filterConversationsResponse(conversations);
    const { favoriteConversations, unfavoriteConversations } = this.projectService.filterConversationsToFavoriteAndUnfavorite(filteredConversations);
    const conversationsToRender = this.projectService.setConversations(favoriteConversations, unfavoriteConversations);
    this.conversations$.next(conversationsToRender);
  }

  openConversation(conversation: IConversation): void {
    this.router.navigate([`/conversations/${conversation.id}`]).then();
  }

  changeConversationFavoriteState(conversation: IConversation): void {
    this.projectService.changeConversationFavouriteState(conversation.id, conversation.isFavorite).subscribe(
      () => {
        let newConversations = this.conversations$.getValue();
        newConversations.forEach(conver => {
           if (conver.id === conversation.id) {
             conver.isFavorite = conversation.isFavorite;
           }
        });
        newConversations = newConversations.sort((a,b) => (Number(b.isFavorite) || 0) - (Number(a.isFavorite) || 0));
        this.conversations$.next(newConversations);
      }
    );
  }

  openDialog(dialogName: string, conversation?: IConversation): void {
    const dialogConfig = { data: { conversation } };
    let dialogRef;
    switch (dialogName) {
      case 'addUser': {
        dialogRef = this.dialog.open(AddUserDialogComponent, dialogConfig);
        dialogRef?.afterClosed().subscribe(data => {
          if (data.selectedUser) {
            this.projectService.addUserToConversation(data.conversationId, data.selectedUser).subscribe(() => {
              let newConversations = this.conversations$.getValue();
              newConversations.map(conv => {
                if (conv.id === conversation?.id) {
                  conv.contributors?.push(data.selectedUser);
                }
              })
              this.conversations$.next(newConversations);
            });
          }
        });
        break;
      }
      case 'showInfo': {
        dialogRef = this.dialog.open(InfoDialogComponent, dialogConfig);
        break;
      }
      case 'delete': {
        dialogRef = this.dialog.open(DeleteConversationDialogComponent, dialogConfig);
        dialogRef?.afterClosed().subscribe(data => {
          if (data) {
            this.projectService.deleteConversation(data).subscribe(() => {
              this.conversations$.next([...this.conversations$.getValue().filter(conv => conv.id !== conversation?.id)]);
            });
          }
        });
        break;
      }
      case 'createConversation': {
        dialogRef = this.dialog.open(CreateConversationComponent, dialogConfig);
        dialogRef?.afterClosed().subscribe(data => {
          if (data) {
            this.projectService.createConversation(data).subscribe(res => {
              this.conversations$.next([...this.conversations$.getValue(), res.message]);
            });
          }
        });
        break;
      }
      default: {
        this.notification.open('Error, try again later', 'ok', notificationConfig);
        break;
      }
    }
  }

  signOut(): void {
    localStorage.removeItem('auth_data');
    this.router.navigate(['/login']).then();
  }
}
