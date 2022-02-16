import { Component, Inject, OnInit } from '@angular/core';
import { IDialogData, IUser } from "../../../interfaces/interface";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { notificationConfig } from "../../../configs/config";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../../../services/auth.service";
import { ProjectService } from "../../../services/project.service";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.less']
})
export class AddUserDialogComponent implements OnInit {
  public users: any[] = [];
  public selectedUser: IUser;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private projectService: ProjectService,
    private notification: MatSnackBar,
    private dialogRef: MatDialogRef<IDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) { }

  ngOnInit(): void {
    const contributors = this.data.conversation.contributors?.map(user => user.id);

    this.http.get(environment.apiUrl + 'auth/users').subscribe((res: any) => {
      this.users = res.message;
      this.users = this.users.filter(user => user.id !== this.authService.userId && !contributors?.includes(user.id));
    }, error => {
      this.notification.open(error.error.message, 'ok', notificationConfig);
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addUserToConversation(conversationId: string): void {
    this.projectService.addUserToConversation(conversationId, this.selectedUser).subscribe()
    this.closeDialog();
  }

}
