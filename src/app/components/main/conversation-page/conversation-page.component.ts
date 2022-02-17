import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProjectService } from "../../../services/project.service";
import { notificationConfig } from "../../../configs/config";
import { IConversation, IMutation, IUser } from "../../../interfaces/interface";

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

    this.projectService.observableConversations.subscribe((conversations: any) => {
      this.concatenateConversationArrays(conversations[0], conversations[1]);
    });
    this.projectService.getInfoAboutConversation(this.conversationId).subscribe(res => {
      this.firstInitialize(res.message);
    });
  }

  concatenateConversationArrays(firstArray: IConversation[], secondArray: IConversation[]): void {
    const concatenatedConversations: IConversation[] = [];
    firstArray.forEach((conversation: IConversation) => {
      concatenatedConversations.push(conversation);
    });
    secondArray.forEach((conversation: IConversation) => {
      concatenatedConversations.push(conversation);
    });
    concatenatedConversations.forEach(conversation => {
      if (conversation.id === this.conversationId) {
        this.setInfoAboutConversation(conversation);
      }
    });
  }

  firstInitialize(conversation: IConversation): void {
    this.text = conversation.text || '';
    this.users.push(conversation.author);
    conversation.contributors?.forEach((user: IUser) => {
      this.users.push(user);
    });
    this.setInfoAboutConversation(conversation);
  }

  setInfoAboutConversation(conversation: IConversation): void {
    this.users.forEach(user => {
      conversation.mutations.forEach((mutation: IMutation) => {
        if (mutation.userId === user.id) {
          user.countOfMutations = mutation.countOfMutations;
        }
      });
      if (!user.countOfMutations && user.countOfMutations !== 0) {
        user.countOfMutations = 0;
      }
    })
  }

  saveConversation(): void {
    if (this.text) {
      this.projectService.editConversation(this.conversationId, this.text).subscribe(res => {
        const conversations: IConversation[] = [];
        conversations.push(res.message.listOfFavoriteConversations);
        conversations.push(res.message.listOfUnfavoriteConversations);
        this.projectService.observableConversations.next(conversations);
        this.notification.open('Saved!', 'ok', notificationConfig);
      });
    }
  }
}
