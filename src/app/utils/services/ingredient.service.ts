import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  // ----- Propriétés -----

  private apiUrl = '';


  // ----- Constructeur -----

  constructor(private http: HttpClient) { }


  // ----- Méthodes -----

  getIngredient(code: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${code}.json`);
  }

}
