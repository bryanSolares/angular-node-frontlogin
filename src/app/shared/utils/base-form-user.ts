import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BaseFormUser {

  private _isValidEmail = /\S+@\S+\.\S+/;
  private _errorMessage = '';
  baseForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern(this._isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    role: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder) { }

  isValidField(field: string): boolean {
    return (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) && !this.baseForm.get(field).valid;
  }

  getErrorMessage(field: string): string {

    const errors = this.baseForm.get(field).errors;

    if (errors) {
      const minLength = errors?.minlength?.requiredLength;
      const messages = { required: 'You must enter a value', pattern: 'Not a valid email', minlength: `This field must be longer than ${minLength} characters` };
      const errorKey = Object.keys(errors).find(Boolean);
      console.log(errorKey);
      this._errorMessage = messages[errorKey];
    }

    return this._errorMessage;

  }



}
