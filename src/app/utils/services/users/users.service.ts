import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { ConsumerLogin } from '../../../types/consumerLogin.type';
import { ConsumerRegister } from '../../../types/consumerRegister.type';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = "http://localhost:8080/api/consumer"

  constructor(private http: HttpClient) { }

  doLogin(consumerLogin: ConsumerLogin): Observable<{ accessToken: string }>{
    return this.http.post<{ accessToken: string }>(this.url + "/login", consumerLogin).pipe(
      tap((res) => {
        localStorage.setItem("token", res.accessToken)
        localStorage.setItem("isAdmin", 'true'); // TODO: Ajouter le rôle de l'utilisateur dans le ConsumerLogin pour pouvoir le récupérer ici
      }),
      catchError((error) => {
        alert(error.message)
        return of()
      })
    );
  }
  
  doRegister(consumerRegister: ConsumerRegister): Observable<ConsumerRegister>{
    return this.http.post<ConsumerRegister>(this.url + "/new", consumerRegister).pipe(
      catchError((error) => {
        alert(error.message)
        return of()
      })
    );
  }

  // TODO: Ajouter la déconnexion de l'utilisateur, sans oublire de supprimer le token et isAdmin de localStorage

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }
}
