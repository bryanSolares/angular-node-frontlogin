import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseFormUser } from '@shared/utils/base-form-user';
import { Subject } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { takeUntil } from 'rxjs/operators';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  actionTodo = Action.NEW;
  showPasswordField = true;
  hide = true;
  private _destroy$ = new Subject<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public baseFormUser: BaseFormUser, private userService: UsersService) { }


  ngOnInit(): void {
    if (this.data.user?.hasOwnProperty('userId')) {
      this.actionTodo = Action.EDIT
      this.showPasswordField = false;
      this.baseFormUser.baseForm.get('password').setValidators(null);
      // * this.baseFormUser.baseForm.get('password').clearValidators();
      this.baseFormUser.baseForm.updateValueAndValidity();
      this.patchFormData(this.data.user.username, this.data.user.role);
    }
  }

  onSave(): void {
    const formValue = this.baseFormUser.baseForm.value;
    if (this.actionTodo === Action.NEW) {
      this.userService.newUser(formValue).pipe(takeUntil(this._destroy$)).subscribe(response => console.log(response));
    } else {
      this.userService.updateUser(this.data?.user?.userId, formValue).pipe(takeUntil(this._destroy$)).subscribe(response => console.log(response));
    }
  }

  checkField(field: string): boolean {
    return this.baseFormUser.isValidField(field);
  }

  private patchFormData(username: string = '', role: string = ''): void {
    this.baseFormUser.baseForm.patchValue({ username, role })
  }

  ngOnDestroy(): void {
    this.patchFormData();
    this._destroy$.next({});
    this._destroy$.complete();
  }

}
