import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ProjectService } from "../../../services/project.service";
import { FormService } from "../../../services/form.service";
import { IConversation, IDialogData } from "../../../interfaces/interface";

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
    this.projectService.createConversation(name).subscribe(res => {
      const conversations: IConversation[] = [];
      conversations.push(res.message.listOfFavoriteConversations);
      conversations.push(res.message.listOfUnfavoriteConversations);
      this.projectService.observableConversations.next(conversations);
    });

    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
