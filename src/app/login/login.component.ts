import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequestService } from '../service/auth-request.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

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
    this.auth.getuser().subscribe((res: any) => {
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
    this.auth.getuser().subscribe((users: any[]) => {
      const user = users.find(item =>
        item.email === this.loginForm.value.email &&
        item.password === this.loginForm.value.password
      );

      if (!user) {
        alert("Email or password is incorrect");
      } else {
        localStorage.setItem('userName', user.username || user.email);
        this.router.navigate(['/movies']);
        const model = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        }
        this.auth.createlogin(model).subscribe
          ((res: any) => {
            this.router.navigate(['/movies'])

          })

      }
    });
  }
}