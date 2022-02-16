import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { notificationConfig } from "../configs/config";
import { MatSnackBar } from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userId: any = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private notification: MatSnackBar
  ) { }


  takeTokenFromLocalStorage(): void {
    this.userId = localStorage.getItem('auth_data');
  }

  checkServerIsLive(): Observable<any> {
    return this.http.get(environment.apiUrl + 'ping').pipe(
      catchError(error => {
        this.notification.open('Server is not alive', 'ok', notificationConfig);
        localStorage.removeItem('auth_data');
        this.router.navigate(['/login']).then();
        return throwError(error);
      }));
  }
}
