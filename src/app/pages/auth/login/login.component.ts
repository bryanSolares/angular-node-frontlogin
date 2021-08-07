import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { BaseFormUser } from '../../../shared/utils/base-form-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  hide = true;
  private subscription = new Subscription;

  constructor(private authService: AuthService, private router: Router, public baseFormLogin: BaseFormUser) { }

  ngOnInit(): void {
    this.baseFormLogin.baseForm.get('role').clearValidators();
    this.baseFormLogin.baseForm.get('role').updateValueAndValidity();
  }

  onLogin(): void {

    if (this.baseFormLogin.baseForm.invalid) {
      return;
    }

    const formValue = this.baseFormLogin.baseForm.value;
    this.subscription.add(
      this.authService.login(formValue).subscribe(responseUser => {
        if (responseUser) {
          this.router.navigateByUrl('/');
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
