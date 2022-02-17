import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../../../services/auth.service";
import { FormService } from "../../../services/form.service";
import { notificationConfig } from "../../../configs/config";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.less']
})
export class RegistrationPageComponent implements OnInit {

  public registrationForm: FormGroup;
  public isButtonDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private http: HttpClient,
    private router: Router,
    private formService: FormService,
    private authService: AuthService,
    private notification: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formService.registrationForm();
  }

  goToLoginPage(): void {
    this.router.navigate(['/login']).then();
  }

  signUp(): void {
    const name = this.registrationForm.controls['name'].value;
    const email = this.registrationForm.controls['email'].value;
    const password = this.registrationForm.controls['password'].value;
    this.authService.signUp(name, email, password).subscribe(res => {
      this.router.navigate(['/login']).then();
    }, error => {
      this.notification.open(error.error.message, 'ok', notificationConfig);
    });
  }
}
