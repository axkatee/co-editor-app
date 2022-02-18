import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { FormService } from "../../../services/form.service";
import { SocketService } from "../../../services/socket.service";
import {IResponse} from "../../../interfaces/interface";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private socketService: SocketService,
    private formService: FormService
  ) {
    this.socketService.removeUserSocketInfo();
  }

  ngOnInit(): void {
    this.loginForm = this.formService.loginForm();
  }

  goToSignUpPage(): void {
    this.router.navigate(['/signup']).then();
  }

  login(): void {
    const email = this.loginForm.controls['email'].value.toString();
    const password = this.loginForm.controls['password'].value.toString();
    this.authService.signIn(email, password).subscribe((res: IResponse) => {
      localStorage.setItem('auth_data', res.message as string);
      this.router.navigate(['/conversations']).then();
    });
  }
}
