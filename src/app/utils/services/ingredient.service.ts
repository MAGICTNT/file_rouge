import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Ingredient {
  id: number;
  title: string;
}


@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  // ----- Propriétés -----

  private apiUrl = 'http://localhost:8080/api/ingredient';


  // ----- Constructeur -----

  constructor(private http: HttpClient) { }


  // ----- Méthodes -----

  getIngredient(code: string): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.apiUrl}/${code}`);
  }

  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.apiUrl}/all`);
  }

}
