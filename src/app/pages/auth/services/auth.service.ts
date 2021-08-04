import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "@env/environment";
import { UserReponse, User, Roles } from "@shared/models/user.interface";

const helper = new JwtHelperService();

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private _user = new BehaviorSubject<UserReponse>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  get user$(): Observable<UserReponse> {
    return this._user.asObservable();
  }

  get userValue(): UserReponse {
    return this._user.getValue();
  }


  login(authData: User): Observable<UserReponse | void> {
    return this.http.post<UserReponse>(`${environment.API_URL}/auth/login`, authData).pipe(
      map((userResponse: UserReponse) => {
        this.saveLocalStorage(userResponse);
        return userResponse;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        this.logout()
      } else {
        this._user.next(user);
      }

    }
  }

  private saveLocalStorage(user: UserReponse): void {
    const { userId, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
    this._user.next(user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this._user.next(null);
    this.router.navigateByUrl('/login');
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = "An error occured retrienving data";
    if (error) {
      errorMessage = `Error code: ${error.error.message}`;
    }

    window.alert(errorMessage);

    return throwError(errorMessage);
  }

}
