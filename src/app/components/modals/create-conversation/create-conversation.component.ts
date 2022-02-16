import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IDialogData } from "../../../interfaces/interface";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../../../services/auth.service";
import { FormService } from "../../../services/form.service";
import { FormGroup } from "@angular/forms";
import { notificationConfig } from "../../../configs/config";
import { environment } from "../../../../environments/environment";
import {finalize} from "rxjs";
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-create-conversation',
  templateUrl: './create-conversation.component.html',
  styleUrls: ['./create-conversation.component.less']
})
export class CreateConversationComponent implements OnInit {
  public conversationForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private formService: FormService,
    private dialogRef: MatDialogRef<IDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) { }

  ngOnInit(): void {
    this.conversationForm = this.formService.conversationForm();
  }

  createConversation(): void {
    const name: string = this.conversationForm.controls['name'].value.toString();
    this.projectService.createConversation(name).subscribe(res => console.log(res.message));

    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
