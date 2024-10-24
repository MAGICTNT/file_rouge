import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // ----- Propriétés -----

  private apiUrl = 'http://localhost:4200/api/recipes';


  // ----- Constructeur -----

  constructor(private http: HttpClient) { }


  // ----- Méthodes -----

  getRecipes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getRecipeById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createRecipe(recipe: any): Observable<any> {
    return this.http.post(this.apiUrl, recipe);
  }

  updateRecipe(id: string, recipe: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, recipe);
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
