import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IDialogData } from "../../../interfaces/interface";

@Component({
  selector: 'app-create-conversation',
  templateUrl: './create-conversation.component.html',
  styleUrls: ['./create-conversation.component.less']
})
export class CreateConversationComponent {

  constructor(
    private dialogRef: MatDialogRef<IDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) { }

  createConversation(): void {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
