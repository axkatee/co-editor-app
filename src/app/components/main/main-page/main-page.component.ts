import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../../../services/auth.service";
import { ProjectService } from "../../../services/project.service";
import { notificationConfig } from "../../../configs/config";
import { IConversation } from "../../../interfaces/interface";
import { AddUserDialogComponent } from "../../modals/add-user-dialog/add-user-dialog.component";
import { InfoDialogComponent } from "../../modals/info-dialog/info-dialog.component";
import { DeleteConversationDialogComponent } from "../../modals/delete-conversation-dialog/delete-conversation-dialog.component";
import { CreateConversationComponent } from "../../modals/create-conversation/create-conversation.component";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {
  public conversations: Subject<IConversation[]> = new Subject<IConversation[]>();

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private dialog: MatDialog,
    private notification: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.projectService.getConversations().subscribe(res => {
      this.setConversations(res.message.listOfFavoriteConversations, res.message.listOfUnfavoriteConversations);
    });

    this.projectService.observableConversations.subscribe((conversations: any) => {
      this.setConversations(conversations[0], conversations[1]);
    });
  }

  setConversations(favoriteConversations: IConversation[], unfavoriteConversations: IConversation[]): void {
    const filteredConversations: IConversation[] = [];
    favoriteConversations?.forEach((conversation: IConversation) => {
      filteredConversations.push(conversation);
      conversation.isFavorite = true;
    });
    unfavoriteConversations?.forEach((conversation: IConversation) => {
      filteredConversations.push(conversation);
    });
    this.conversations.next(filteredConversations);
  }

  openConversation(conversation: IConversation): void {
    this.router.navigate([`/conversations/${conversation.id}`]).then();
  }

  changeConversationFavoriteState(conversation: IConversation): void {
    this.projectService.changeConversationFavouriteState(conversation.id, conversation.isFavorite).subscribe(res => {
      const conversations: IConversation[] = [];
      conversations.push(res.message.listOfFavoriteConversations);
      conversations.push(res.message.listOfUnfavoriteConversations);
      this.projectService.observableConversations.next(conversations);
    });
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
