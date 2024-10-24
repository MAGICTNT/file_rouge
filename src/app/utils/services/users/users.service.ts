import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = "http://localhost:8080/api"

  constructor(private http: HttpClient) { }

  doHello(): Observable<string>{
    return this.http.get(this.url, { responseType: 'text' });
  }
}
