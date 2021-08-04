import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../pages/auth/services/auth.service';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (request.url.includes('user')) {
      const authToken = this.authService.userToken;
      const authRequest = request.clone({ setHeaders: { auth: authToken } })
      return next.handle(authRequest);
    }

    return next.handle(request);

  }
}
