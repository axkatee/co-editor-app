import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../../../services/auth.service";
import { ProjectService } from "../../../services/project.service";
import { IConversation, IDialogData, IUser } from "../../../interfaces/interface";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.less']
})
export class AddUserDialogComponent implements OnInit {
  public users: IUser[] = [];
  public selectedUser: IUser;

  private contributors: string[];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private projectService: ProjectService,
    private notification: MatSnackBar,
    private dialogRef: MatDialogRef<IDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) { }

  ngOnInit(): void {
    this.contributors = this.data.conversation.contributors?.map(user => user.id) || [];

    this.authService.getUsers().subscribe((res: any) => {
      this.setUsers(res.message);
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  setUsers(users: IUser[]): void {
    this.users = users;
    this.users = this.users.filter(user => user.id !== this.authService.userId && !this.contributors?.includes(user.id));
  }

  addUserToConversation(conversationId: string): void {
    if (this.selectedUser) {
      this.projectService.addUserToConversation(conversationId, this.selectedUser).subscribe(res => {
        const conversations: IConversation[] = [];
        conversations.push(res.message.listOfFavoriteConversations);
        conversations.push(res.message.listOfUnfavoriteConversations);
        this.projectService.observableConversations.next(conversations);
      });
    }
    this.closeDialog();
  }

}
