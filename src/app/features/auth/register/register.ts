import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  // private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  registerForm: FormGroup = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    confirmPassword: ["", [Validators.required]],
    phone: ["", [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
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

  submitForm():void{
      if(this.registerForm.valid){
      //   this.authService.signUp(this.registerForm.value).subscribe({
      //     next:(res)=> {
      //       console.log(res)
      //       if(res.message === 'success'){
      //         this.router.navigate(['/login']);
      //       }
      //     },
      //   })
      // }else(
      //   this.registerForm.markAllAsTouched()
      // )
      
      }
    }
}
