import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registerForm: FormGroup;


 passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) return null;
      const password = control.parent.get('password')?.value;
      const confirmPassword = control.value;
  
      return password && confirmPassword && password === confirmPassword
        ? null
        : { passwordMismatch: true };
    };
  }

  constructor(private fb: FormBuilder) {
    this.registerForm= this.fb.group({
      Name:['', [Validators.required,Validators.minLength(3)]],
      email: ['', [ Validators.required,Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      password: ['', [ Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$')]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator()]],
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }
  
  handleSubmitForm() {
    console.log(this.registerForm.value);
  }

}
