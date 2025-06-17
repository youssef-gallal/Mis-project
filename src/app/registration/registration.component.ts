import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequestService } from '../service/auth-request.service';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthRequestService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }


  submit() {
    const formValue = this.registerForm.value;
    const model = {
      username: formValue.username,
      email: formValue.email,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword
    };

    this.auth.getuser().subscribe((users: any[]) => {
      const emailExists = users.some(user => user.email === model.email);

      if (emailExists) {
        alert('Email already registered. Please use a different email.');
      } else {
        this.auth.createuser(model).subscribe(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }


}

