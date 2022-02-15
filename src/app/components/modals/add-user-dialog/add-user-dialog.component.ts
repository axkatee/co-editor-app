import { Component, Inject, OnInit } from '@angular/core';
import {IConversation, IDialogData, IUser} from "../../../interfaces/interface";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { notificationConfig} from "../../../configs/config";
import { MatSnackBar } from "@angular/material/snack-bar";

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
    private notification: MatSnackBar,
    private dialogRef: MatDialogRef<IDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) { }

  ngOnInit(): void {
    this.http.get(environment.apiUrl + 'auth/users').subscribe((res: any) => {
      this.users = res.message;
    }, error => {
      this.notification.open(error.error.message, 'ok', notificationConfig);
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addUserToConversation(conversation: IConversation): void {
    console.log(this.selectedUser)
    this.dialogRef.close();
  }

}
