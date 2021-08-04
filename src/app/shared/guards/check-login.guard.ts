import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../../pages/auth/services/auth.service';
import { UserReponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(take(1), map((user: UserReponse) => (!user ? true : false)));
  }

}
