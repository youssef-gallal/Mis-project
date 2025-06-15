import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

    constructor(private fb: FormBuilder) {
      this.loginForm= this.fb.group({
        email: ['', [ Validators.required,Validators.email]],
        password: ['', [ Validators.required]],
      });
    }

    get formControls() {
      return this.loginForm.controls;
    }

    handleSubmitForm() {
      console.log(this.loginForm.value);
    }

}
