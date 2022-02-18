import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";
import {IConversation, ITypesOfConversations, IUser} from "../interfaces/interface";
import { notificationConfig } from "../configs/matSnackbarConfig";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public conversations$ = new BehaviorSubject<IConversation[]>([]);
  private userId: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notification: MatSnackBar
  ) { }

  public getConversations(): Observable<any> {
    this.userId = this.authService.userId;
    return this.http.get(environment.apiUrl + `conversation/?userId=${this.userId}`).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  public getInfoAboutConversation(conversationId: string): Observable<any> {
    return this.http.get(environment.apiUrl + `conversation/info?conversationId=${conversationId}`).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  public createConversation(name: string): Observable<any> {
    this.userId = this.authService.userId;
    return this.http.post(environment.apiUrl + 'conversation/', { name, author: this.userId }).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  public editConversation(conversationId: string, text: string): Observable<any> {
    this.userId = this.authService.userId;
    return this.http.post(environment.apiUrl + 'conversation/mutations', { conversationId, text, userId: this.userId }).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  public deleteConversation(conversationId: string): Observable<any> {
    this.userId = this.authService.userId;
    return this.http.delete(environment.apiUrl + `conversation/?conversationId=${conversationId}&author=${this.userId}`).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  public addUserToConversation(conversationId: string, userId: IUser): Observable<any> {
    this.userId = this.authService.userId;
    return this.http.post(environment.apiUrl + 'conversation/user/add', { conversationId, author: this.userId, invitedUser: userId }).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  public changeConversationFavouriteState(conversationId: string, isFavorite: boolean): Observable<any> {
    this.userId = this.authService.userId;
    return this.http.post(environment.apiUrl + 'conversation/favorite', { conversationId, userId: this.userId, isFavorite }).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  public filterConversationsResponse(conversations: any): IConversation[] {
    let filteredConversations: IConversation[] = [];

    if (conversations) {
      Object.keys(conversations).forEach(id => {
        filteredConversations.push(conversations[id]);
      });
    }

    return filteredConversations;
  }

  public filterConversationsToFavoriteAndUnfavorite(conversations: IConversation[]): ITypesOfConversations {
    const favoriteConversations: IConversation[] = [];
    const unfavoriteConversations: IConversation[] = [];

    conversations.forEach(conversation => {
      if (conversation.author.id === this.userId) {
        conversation.author.isFavorite
          ? favoriteConversations.push(conversation)
          : unfavoriteConversations.push(conversation)
      } else if (conversation.contributors) {
        const user = conversation.contributors.find(user => user.id === this.userId);
        if (user && user.isFavorite) {
          favoriteConversations.push(conversation);
        } else if (user && !user.isFavorite) {
          unfavoriteConversations.push(conversation);
        }
      }
    });
    return { favoriteConversations, unfavoriteConversations };
  }

  public setConversations(favoriteConversations: IConversation[], unfavoriteConversations: IConversation[]): IConversation[] {
    const filteredConversations: IConversation[] = [];
    favoriteConversations?.forEach((conversation: IConversation) => {
      filteredConversations.push(conversation);
      conversation.isFavorite = true;
    });
    unfavoriteConversations?.forEach((conversation: IConversation) => {
      filteredConversations.push(conversation);
    });

    return filteredConversations;
  }
}
