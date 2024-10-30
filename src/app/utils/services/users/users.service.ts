import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { ConsumerLogin } from '../../../types/consumerLogin.type';
import { ConsumerRegister } from '../../../types/consumerRegister.type';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // ----- Propriétés -----

  url: string = "http://localhost:8080/api/consumer"


  // ----- Constructeur -----

  constructor(private http: HttpClient) { }


  // ----- Méthodes -----

  doLogin(consumerLogin: ConsumerLogin): Observable<{ pseudo: string, mail: string, role: string } | null>{
    return this.http.post<{ pseudo: string, mail: string, role: string }>(this.url + "/login", consumerLogin).pipe(
      tap((res) => {
        localStorage.setItem("isLogged", 'true');
        localStorage.setItem("pseudo", res.pseudo);
        localStorage.setItem("mail", res.mail);
        localStorage.setItem("role", res.role);
      }),
      catchError((error) => {
        alert(error.message)
        return of(null)
      })
    );
  }
  

  doRegister(consumerRegister: ConsumerRegister): Observable<ConsumerRegister | null>{
    return this.http.post<ConsumerRegister>(this.url + "/new", consumerRegister).pipe(
      catchError((error) => {
        alert(error.message)
        return of(null)
      })
    );
  }

  doLogout(): void {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('pseudo');
    localStorage.removeItem('mail');
    localStorage.removeItem('role');
    localStorage.removeItem('fridge');
  }

  updateMail(mail: string, password: string): Observable<{ key: number, value: string } | null> {
    return this.http.put<{ key: number, value: string }>(this.url + "/update/mail", { pseudo: localStorage.getItem('pseudo'), mail: mail, password: password });
  }

  updatePassword(password: string) {
    return this.http.put<{ key: number, value: string }>(this.url + "/update", { pseudo: localStorage.getItem('pseudo'), mail: localStorage.getItem('mail'), password: password , role: localStorage.getItem('role') });
  }
  
  isLogged(): boolean {
    return localStorage.getItem('isLogged') === 'true';
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }
}
