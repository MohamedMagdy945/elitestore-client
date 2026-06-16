import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { BasketService } from '../../../core/services/basket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly basketService = inject(BasketService);
  private readonly router = inject(Router)
  loginForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
  })

  submitForm() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.isSuccess) {
              localStorage.setItem('token', res.data.accessToken);
              const user = this.authService.getCurrentUser();

              if (user) {
                this.basketService.loadBasketCount(user.email);
              }
            } else {
              this.router.navigate(['/home']);
            }
          },
          error: (err) => {
            console.log('Error:', err);
          }
        });
    }
  }
}
