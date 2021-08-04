import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { User } from '../../../shared/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL}/user/all-users`).pipe(catchError(this.handlerError));
  }

  getById(userId: number): Observable<any> {
    return this.http.get<any[]>(`${environment.API_URL}/user/${userId}`).pipe(catchError(this.handlerError));
  }

  newUser(newUser: any): Observable<any> {
    return this.http.post<any[]>(`${environment.API_URL}/user/new-user`, newUser).pipe(catchError(this.handlerError));
  }

  updateUser(userId: number, updatedUser): Observable<any> {
    return this.http.patch<any[]>(`${environment.API_URL}/user/edit-user/${userId}`, updatedUser).pipe(catchError(this.handlerError));
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any[]>(`${environment.API_URL}/user/delete/${userId}`).pipe(catchError(this.handlerError));
  }

  private handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error: ${error}`
    }

    window.alert(errorMessage)
    return throwError(error);
  }
}
