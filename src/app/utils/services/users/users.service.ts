import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ConsumerLogin } from '../../../types/consumerLogin.type';
import { ConsumerRegister } from '../../../types/consumerRegister.type';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = "http://localhost:8080/api/consumer"

  constructor(private http: HttpClient) { }

  doLogin(consumerLogin: ConsumerLogin): Observable<ConsumerLogin>{
    return this.http.post<ConsumerLogin>(this.url + "/login", consumerLogin).pipe(
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
}
