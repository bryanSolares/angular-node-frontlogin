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

  private _loggedIn = new BehaviorSubject<boolean>(false);
  private _role = new BehaviorSubject<Roles>(null);
  private _userToken = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  get isLogged$(): Observable<boolean> {
    return this._loggedIn.asObservable();
  }

  get idAdmin$(): Observable<string> {
    return this._role.asObservable();
  }

  get userToken(): string {
    return this._userToken.getValue();
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
        this._loggedIn.next(true);
        this._role.next(user.role);
        this._userToken.next(user.token);
      }

    }
  }

  private saveLocalStorage(user: UserReponse): void {
    const { userId, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
    this._userToken.next(user.token);
    this._loggedIn.next(true);
    this._role.next(rest.role);
  }

  logout(): void {
    localStorage.removeItem('user');
    this._loggedIn.next(false);
    this._role.next(null);
    this._userToken.next(null);
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
