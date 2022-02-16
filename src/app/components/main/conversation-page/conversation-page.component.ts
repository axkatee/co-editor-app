import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { notificationConfig } from "../../../configs/config";
import { ProjectService } from "../../../services/project.service";
import { Router } from "@angular/router";
import { IMutation, IUser } from "../../../interfaces/interface";

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.less']
})
export class ConversationPageComponent implements OnInit {
  public text: string = '';
  public users: IUser[] = [];

  private conversationId: string;

  constructor(
    private projectService: ProjectService,
    private notification: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.conversationId = this.router.url.split('conversations/')[1];
    this.projectService.getInfoAboutConversation(this.conversationId).subscribe(res => {
      this.text = res.message.text;
      this.users.push(res.message.author);
      res.message.contributors?.forEach((user: IUser) => {
        this.users.push(user);
      });
      this.users.forEach(user => {
        res.message.mutations.forEach((mutation: IMutation) => {
          if (mutation.userId === user.id) {
            user.countOfMutations = mutation.countOfMutations;
          }
        });
        if (!user.countOfMutations && user.countOfMutations !== 0) {
          user.countOfMutations = 0;
        }
      })
    });
  }

  saveConversation(): void {
    this.projectService.editConversation(this.conversationId, this.text).subscribe(res => {
      console.log(res.message)
      this.notification.open('Saved!', 'ok', notificationConfig);
    });
  }

}
