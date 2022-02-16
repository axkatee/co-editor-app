import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {IDialogData, IUser} from "../../../interfaces/interface";

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.less']
})
export class InfoDialogComponent implements OnInit {
  public contributors: string | string[];
  public editedBy: string;

  constructor(
    private dialogRef: MatDialogRef<IDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) { }

  ngOnInit(): void {
    if (this.data.conversation.contributors?.length) {
      this.contributors = this.data.conversation.contributors.map(user => user.name);
    } else {
      this.contributors = 'none';
    }

    this.editedBy = this.data.conversation.mutations ? this.data.conversation.mutations : 'none';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
