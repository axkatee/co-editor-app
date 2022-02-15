import { Component, OnInit } from '@angular/core';
import { IConversation } from "../../../interfaces/interface";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { AddUserDialogComponent } from "../../modals/add-user-dialog/add-user-dialog.component";
import { InfoDialogComponent } from "../../modals/info-dialog/info-dialog.component";
import {
  DeleteConversationDialogComponent
} from "../../modals/delete-conversation-dialog/delete-conversation-dialog.component";
import { notificationConfig } from "../../../configs/config";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreateConversationComponent } from "../../modals/create-conversation/create-conversation.component";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {
  public conversations: IConversation[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private notification: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.conversations = [{id: '111', name: 'weqwe', edited_by: 'dfshjfhsf'}, {id: '222', name: 'dfgdfg', edited_by: 'dfshjfhsf'}, {id: '333', name: 'sdfdf', edited_by: 'dfshjfhsf'}, {id: '444', name: 'sdsds', edited_by: 'dfshjfhsf'}, {id: '555', name: 'sdsds', edited_by: 'dfshjfhsf'}, {id: '666', name: 'sdsds', edited_by: 'dfshjfhsf'}, {id: '111', name: 'tghfyn', edited_by: 'dfshjfhsf'}, {id: '777', name: 'tukyi', edited_by: 'dfshjfhsf'}, {id: '888', name: 'sdsds', edited_by: 'dfshjfhsf'}];
  }

  openConversation(conversation: IConversation): void {
    this.router.navigate([`/conversations/${conversation.id}`]).then();
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
