import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userId: any = '';


  takeTokenFromLocalStorage(): void {
    this.userId = localStorage.getItem('auth_data');
  }
}
