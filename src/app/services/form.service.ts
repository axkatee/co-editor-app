import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  public loginForm(): FormGroup {
    return new FormBuilder().group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ]),
      password: new FormControl('', [
        Validators.minLength(4),
        Validators.required,
        Validators.maxLength(32)
      ])
    });
  }

  public registrationForm(): FormGroup {
    return new FormBuilder().group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ]),
      password: new FormControl('', [
        Validators.minLength(4),
        Validators.required,
        Validators.maxLength(32)
      ])
    });
  }

  public conversationForm(): FormGroup {
    return new FormBuilder().group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ])
    });
  }
}
