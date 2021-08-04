import { Subject, Subscription } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@pages/auth/services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { UtilsService } from '../../services/utils.service';
import { UserReponse } from '../../models/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // * private _subscription = new Subscription;
  private _destroy$ = new Subject<any>();
  isAdmin = null;
  islogged = false;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService, private _utilsService: UtilsService) { }

  ngOnInit(): void {
    // * this._subscription.add(this.authService.isLogged$.subscribe((user: UserReponse) => { this.islogged = true; this.isAdmin = user.role });
    this.authService.user$.pipe(takeUntil(this._destroy$)).subscribe((user: UserReponse) => { user ? this.islogged = true : this.islogged = false; this.isAdmin = user?.role; })
  }

  onToogleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
    this._utilsService.openSideNav(false);
  }

  ngOnDestroy(): void {
    //* this._subscription.unsubscribe();
    this._destroy$.next({});
    this._destroy$.complete();
  }

}
