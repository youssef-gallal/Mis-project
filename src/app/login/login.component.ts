import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequestService } from '../service/auth-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  alertVisible: boolean = false;
  alertMessage: string = '';
  alertType: string = '';

  loginForm: FormGroup;
  users: any[] = []

  constructor(private fb: FormBuilder,
    private router: Router, private auth: AuthRequestService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
  }


  getusers() {
    this.auth.getregister().subscribe((res: any) => {
      this.users = res
    })
  }
  get formControls() {
    return this.loginForm.controls;
  }

  handleSubmitForm() {
    console.log(this.loginForm.value);
  }


  Submit() {
    this.auth.getregister().subscribe((users: any[]) => {
      const user = users.find(item =>
        item.email === this.loginForm.value.email &&
        item.password === this.loginForm.value.password
      );

      if (!user) {
        this.alertVisible = true;
        this.alertMessage = 'Email or password is incorrect';
        this.alertType = 'danger';
      } else {
        // localStorage.setItem('userName', user.username || user.email);
        this.alertVisible = true;
        this.alertMessage = 'Login successful!';
        this.alertType = 'success';

        const model = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        }

        this.auth.createlogin(model).subscribe((res: any) => {
          this.router.navigate(['/pricing']);
        });
      }
    });
  }

}