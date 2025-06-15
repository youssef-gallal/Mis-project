import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  handleSubmitForm() {
    console.log(this.loginForm.value);
  }
  Submit() {
    const loginData = {
      userName: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    localStorage.setItem('userName', loginData.userName)
    this.router.navigate(['/movies'])
    console.log(loginData)
  }
}

