import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { FormService } from "../../../services/form.service";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.less']
})
export class RegistrationPageComponent implements OnInit {

  public registrationForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formService: FormService,
    private authService: AuthService
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
    this.authService.signUp(name, email, password).subscribe(() => {
      this.router.navigate(['/login']).then();
    });
  }
}
