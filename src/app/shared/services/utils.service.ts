import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/*@Injectable({
providedIn: 'root'
})*/
export class UtilsService {

  private _sideNavOpened = new BehaviorSubject<boolean>(false);
  sideNavOpened$ = this._sideNavOpened.asObservable();

  constructor() { }

  openSideNav(value: boolean): void {
    this._sideNavOpened.next(value);
  }
}
