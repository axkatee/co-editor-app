import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "../../environments/environment";
import { notificationConfig } from "../configs/config";
import {IConversation, IUser} from "../interfaces/interface";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private userId: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notification: MatSnackBar
  ) { }

  getConversations(): Observable<any> {
    this.userId = this.authService.userId;
    return this.http.get(environment.apiUrl + `conversation/?userId=${this.userId}`).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  getInfoAboutConversation(conversationId: string): Observable<any> {
    return this.http.get(environment.apiUrl + `conversation/info?conversationId=${conversationId}`).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  createConversation(name: string): Observable<any> {
    this.userId = this.authService.userId;
    return this.http.post(environment.apiUrl + 'conversation/', { name, author: this.userId }).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  editConversation(conversationId: string, text: string): Observable<any> {
    this.userId = this.authService.userId;
    return this.http.post(environment.apiUrl + 'conversation/mutations', { conversationId, text, userId: this.userId }).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  deleteConversation(conversationId: string): Observable<any> {
    this.userId = this.authService.userId;
    return this.http.delete(environment.apiUrl + `conversation/?conversationId=${conversationId}&author=${this.userId}`).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  addUserToConversation(conversationId: string, userId: IUser): Observable<any> {
    this.userId = this.authService.userId;
    return this.http.post(environment.apiUrl + 'conversation/add-user', { conversationId, author: this.userId, invitedUser: userId }).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  changeConversationFavouriteState(conversationId: string, isFavorite: boolean): Observable<any> {
    this.userId = this.authService.userId;
    return this.http.post(environment.apiUrl + 'conversation/favorite', { conversationId, userId: this.userId, isFavorite }).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }
}
