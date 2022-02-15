import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IConversation, IDialogData } from "../../../interfaces/interface";

@Component({
  selector: 'app-delete-conversation-dialog',
  templateUrl: './delete-conversation-dialog.component.html',
  styleUrls: ['./delete-conversation-dialog.component.less']
})
export class DeleteConversationDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<IDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteConversation(conversation: IConversation): void {
  }
}
