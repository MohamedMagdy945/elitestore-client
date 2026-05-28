import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
submitForm() {
throw new Error('Method not implemented.');
}
   private readonly fb = inject(FormBuilder);


   loginForm : FormGroup = this.fb.group({
      email : ["" , [Validators.required , Validators.email]],
      password : ["" , [Validators.required ,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
    })
  submit() {
      console.log(this.loginForm.value);
  }
}
