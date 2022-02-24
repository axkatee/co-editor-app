import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, fromEvent, map, Subject, takeUntil } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SocketService } from "../../../services/socket.service";
import { ProjectService } from "../../../services/project.service";
import { IConversation, IUser } from "../../../interfaces/interface";
import { notificationConfig } from "../../../configs/matSnackbarConfig";

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.less']
})
export class ConversationPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('textAreaElement') textAreaElement: ElementRef;
  public text = '';
  public users: IUser[] = [];

  private conversationId: string;
  private destroy$ = new Subject<boolean>();

  constructor(
    private socketService: SocketService,
    private router: Router,
    private projectService: ProjectService,
    private notification: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.conversationId = this.activatedRoute.snapshot.params['id'];

    this.setConversationUpdateHandler();
    this.getInfoAboutConversation();
  }

  ngAfterViewInit(): void {
    const keyUp$ = fromEvent<KeyboardEvent>(this.textAreaElement.nativeElement, 'keyup').pipe(
      takeUntil(this.destroy$),
      map(event => (event.target as HTMLTextAreaElement).value),
      debounceTime(1000),
      distinctUntilChanged()
    );
    keyUp$.subscribe(value => {
      this.text = value;
      this.saveConversation();
    });
  }

  setConversationUpdateHandler(): void {
    this.projectService.deletedConversationId$.subscribe((id: string) => {
      if (id === this.conversationId) {
        this.notification.open('Conversation has been deleted', 'ok', notificationConfig);
        this.router.navigate(['/conversations']).then();
      }
    });

    this.projectService.conversation$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((conversation: IConversation) => {
      this.setInfoAboutConversation(conversation);
    });
  }

  getInfoAboutConversation(): void {
    this.projectService.getInfoAboutConversation(this.conversationId).subscribe(res => {
      this.setInfoAboutConversation(res.message);
    });
  }

  setInfoAboutConversation(conversation: IConversation): void {
    this.users = [conversation.author, ...conversation.contributors || []];
    this.text = conversation.text || '';

    this.users.forEach(user => {
      Object.keys(conversation.mutations).forEach(id => {
        if (id === user.id) {
          user.countOfMutations = conversation.mutations[id];
        }
      });
      if (!user.countOfMutations && user.countOfMutations !== 0) {
        user.countOfMutations = 0;
      }
    });
  }

  saveConversation(): void {
    this.projectService.editConversation(this.conversationId, this.text).subscribe(() => {
      this.notification.open('Saved!', 'ok', notificationConfig);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
