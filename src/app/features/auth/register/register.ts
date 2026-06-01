import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  registerForm: FormGroup = this.fb.group({
    fullName: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    confirmPassword: ["", [Validators.required]],
    phoneNumber: ["", [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, { validators: [this.confirmPassword] })

  confirmPassword(group: AbstractControl) {


    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password !== confirmPassword && confirmPassword !== "") {
      group.get('confirmPassword')?.setErrors({ mismatch: true })
      return { mismatch: true };
    }
    return null;
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.authService.register(this.registerForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.isSuccess) {
              localStorage.setItem('token', res.data.accessToken);
              console.log('Register Success');
            } else {
              console.log(res.message);
            }
          },
          error: (err) => {
            console.log('Error:', err);
          }
        });
    }
  }
  testRefresh() {
    this.authService.refreshToken().subscribe({
      next: (res) => {
        console.log('Refresh Success', res);
      },
      error: (err) => {
        console.error('Refresh Failed', err);
      }
    });
  }

}
