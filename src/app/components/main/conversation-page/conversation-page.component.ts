import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProjectService } from "../../../services/project.service";
import { notificationConfig } from "../../../configs/matSnackbarConfig";
import { IConversation, IMutation, IUser } from "../../../interfaces/interface";
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.less']
})
export class ConversationPageComponent implements OnInit {
  public text = '';
  public users: IUser[] = [];

  private conversationId: string;
  private textChange = new Subject();

  constructor(
    private projectService: ProjectService,
    private notification: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.conversationId = this.router.url.split('conversations/')[1];

    this.textChange.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(() => this.saveConversation());

    this.setConversationsUpdateHandler();
    this.getInfoAboutConversation();
  }

  setConversationsUpdateHandler(): void {
    this.projectService.conversations$.subscribe((conversations: IConversation[]) => {
      const filteredConversations = this.projectService.filterConversationsResponse(conversations);
      this.findCurrentConversation(filteredConversations);
    });
  }

  findCurrentConversation(conversations: IConversation[]): void {
    conversations.forEach(conversation => {
      if (conversation.id === this.conversationId) {
        this.setInfoAboutConversation(conversation);
      }
    });
  }

  getInfoAboutConversation(): void {
    this.projectService.getInfoAboutConversation(this.conversationId).subscribe(res => {
      this.firstInitialize(res.message);
    });
  }

  setInfoAboutConversation(conversation: IConversation): void {
    this.text = conversation.text || '';
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

  firstInitialize(conversation: IConversation): void {
    this.text = conversation.text || '';
    this.users.push(conversation.author);
    conversation.contributors?.forEach((user: IUser) => {
      this.users.push(user);
    });
    this.setInfoAboutConversation(conversation);
  }

  onKeyDown(): void {
    this.textChange.next(this.text);
  }

  saveConversation(): void {
    this.projectService.editConversation(this.conversationId, this.text).subscribe(res => {
      this.notification.open('Saved!', 'ok', notificationConfig);
    });
  }
}
