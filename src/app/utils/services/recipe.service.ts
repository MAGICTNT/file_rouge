import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Recipe {
  id: number;
  title: string;
  numberPeople: number;
  duration: number;
  description: string;
  picture: string;
  seen: number;
  idNutrition: number;
  idCategory: number;
  ingredients: { id: number; quantity: number }[];
  instructions: string[];
}

export interface Category {
  id: number;
  title: string;
}

export interface Nutrition {
  id: number;
  title: string;
}

export interface Ingredient {
  id: number;
  title: string;
  unit: string; // "gr" ou "ml"
}


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // ----- Propriétés -----

  private apiUrl = 'http://localhost:4200/api';

  recipes: Recipe[] = [];


  // ----- Constructeur -----

  constructor(private http: HttpClient) {
    this.loadInitialRecipes();
  }


  // ----- Méthodes -----

  /**
   * Charge les recettes initiales au démarrage
   */
  private loadInitialRecipes(): void {
    this.getRecipes().subscribe(recipes => this.recipes = recipes);
  }

  /**
   * Récupérer toutes les recettes
   */
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`);
  }

  /**
   * Récupérer une recette par ID
   */
  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/recipes/${id}`);
  }

  /**
   * Créer une nouvelle recette
   */
  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.apiUrl}/recipes`, recipe);
  }

  /**
   * Mettre à jour une recette existante
   */
  updateRecipe(id: number, recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/recipes/${id}`, recipe);
  }

  /**
   * Supprimer une recette par ID
   */
  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/recipes/${id}`);
  }

  // -- Catégories --

  /**
   * Récupérer toutes les catégories
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  // -- Nutritions --

  /**
   * Récupérer tous les types de nutrition
   */
  getNutritions(): Observable<Nutrition[]> {
    return this.http.get<Nutrition[]>(`${this.apiUrl}/nutritions`);
  }

  // -- Ingrédients --

  /**
   * Récupérer tous les ingrédients
   */
  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.apiUrl}/ingredients`);
  }


}
