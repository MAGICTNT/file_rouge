import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Recipe {
  id: number;
  title: string;
  category: string;
  image: string;
  time: number;
  person: number;
  calorie: number;
  description: string;
  ingredients: string[];
  instructions: string[];
}


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // ----- Propriétés -----

  private apiUrl = 'http://localhost:4200/api/recipes';

  recipes: Recipe[] = [];


  // ----- Constructeur -----

  constructor(private http: HttpClient) {
    this.getRecipes(); // Appel à la fonction dès le chargement
  }


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
