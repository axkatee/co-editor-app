import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "../../environments/environment";
import { notificationConfig } from "../configs/matSnackbarConfig";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userId: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private notification: MatSnackBar
  ) { }


  public getTokenFromLocalStorage(): void {
    this.userId = localStorage.getItem('auth_data') || '';
  }

  public checkIfServerIsAlive(): Observable<any> {
    return this.http.get(environment.apiUrl + 'ping').pipe(
      catchError(error => {
        this.notification.open('Server is not alive', 'ok', notificationConfig);
        localStorage.removeItem('auth_data');
        this.router.navigate(['/login']).then();
        return throwError(error);
      }));
  }

  public signIn(email: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/login', { email, password }).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  public signUp(name: string, email: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth', { name, email, password }).pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }

  public getUsers(): Observable<any> {
    return this.http.get(environment.apiUrl + 'auth/users').pipe(
      catchError(error => {
        this.notification.open(error.error.message, 'ok', notificationConfig);
        return throwError(error);
      }));
  }
}
