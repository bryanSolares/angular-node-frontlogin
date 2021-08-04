import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  hide = true;
  private subscription = new Subscription;
  private isValidEmail = /\S+@\S+\.\S+/;
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const formValue = this.loginForm.value;
    this.subscription.add(
      this.authService.login(formValue).subscribe(responseUser => {
        if (responseUser) {
          this.router.navigateByUrl('/');
        }
      }));
  }

  getErrorMessage(field: string): string {
    let message;
    if (this.loginForm.get(field).errors.required) {
      message = 'You must enter a value';
    } else if (this.loginForm.get(field).hasError('pattern')) {
      message = 'Not a valid email';
    } else if (!this.loginForm.get(field).hasError('minLength')) {
      const minLength = this.loginForm.get(field).errors?.minlength.requiredLength;
      message = `This field must be longer than ${minLength} characters`;
    }

    return message;
  }

  isValidField(field: string): boolean {
    return (this.loginForm.get(field).touched || this.loginForm.get(field).dirty) && !this.loginForm.get(field).valid;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
