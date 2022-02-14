import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { FormService } from "../../../services/form.service";
import { notificationConfig } from "../../../configs/config";
import { MatSnackBar } from "@angular/material/snack-bar";

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
    private formService: FormService,
    private notification: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formService.loginForm();
  }

  goToSignUpPage(): void {
    this.router.navigate(['/signup']).then();
  }

  login(): void {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    console.log(email, password)
    this.http.post(environment + '/auth/login', { email, password }).subscribe(res => {
    }, error => {
      this.notification.open(error.message, 'ok', notificationConfig);
    });
  }
}
