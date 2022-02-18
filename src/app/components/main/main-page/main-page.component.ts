import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AddUserDialogComponent } from "../../modals/add-user-dialog/add-user-dialog.component";
import { InfoDialogComponent } from "../../modals/info-dialog/info-dialog.component";
import { DeleteConversationDialogComponent } from "../../modals/delete-conversation-dialog/delete-conversation-dialog.component";
import { CreateConversationComponent } from "../../modals/create-conversation/create-conversation.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../../../services/auth.service";
import { ProjectService } from "../../../services/project.service";
import { SocketService } from "../../../services/socket.service";
import { notificationConfig } from "../../../configs/matSnackbarConfig";
import { IConversation, IResponse } from "../../../interfaces/interface";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {
  public conversations = new BehaviorSubject<IConversation[]>([]);
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
    this.socketService.setSocketInfo(this.authService.userId);

    this.setConversationsUpdateHandler();
    this.getConversations();
  }

  setConversationsUpdateHandler(): void {
    this.projectService.conversations$.subscribe((conversations: IConversation[]) => {
      this.setConversations(conversations);
    });
  }

  getConversations(): void {
    this.projectService.getConversations().subscribe((res: IResponse) => {
      this.setConversations(res.message);
    });
  }

  setConversations(conversations: any): void {
    const filteredConversations = this.projectService.filterConversationsResponse(conversations);
    const { favoriteConversations, unfavoriteConversations } = this.projectService.filterConversationsToFavoriteAndUnfavorite(filteredConversations);
    const conversationsToRender = this.projectService.setConversations(favoriteConversations, unfavoriteConversations);
    this.conversations.next(conversationsToRender);
  }

  openConversation(conversation: IConversation): void {
    this.router.navigate([`/conversations/${conversation.id}`]).then();
  }

  changeConversationFavoriteState(conversation: IConversation): void {
    this.projectService.changeConversationFavouriteState(conversation.id, conversation.isFavorite).subscribe();
  }

  openDialog(dialogName: string, conversation?: IConversation): void {
    const dialogConfig = { data: { conversation } };
    switch (dialogName) {
      case 'addUser': {
        this.dialog.open(AddUserDialogComponent, dialogConfig);
        break;
      }
      case 'showInfo': {
        this.dialog.open(InfoDialogComponent, dialogConfig);
        break;
      }
      case 'delete': {
        this.dialog.open(DeleteConversationDialogComponent, dialogConfig);
        break;
      }
      case 'createConversation': {
        this.dialog.open(CreateConversationComponent, dialogConfig);
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
