import { Component } from '@angular/core';
import { Recipe, RecipeService } from '../../utils/services/recipe.service';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

    // ----- Propriétés -----

    // recipes: any[] = [];
    recipes: Recipe[] = [];
    filteredRecipes: Recipe[] = [];
    searchQuery: string = '';
    

    // ----- Constructeur -----
  
    constructor(private recipesService: RecipeService) { }

  
    // ----- Méthodes -----

    ngOnInit(): void {
      // this.getRecipes();

      this.recipesService.getRecipes().subscribe((data) => {
        this.recipes = data;
        this.filteredRecipes = data; // Initialise l'affichage avec toutes les recettes
      });
    }

    /**
     * Récupère toutes les recettes depuis le service
     */
    getRecipes(): void {
      this.recipesService.getRecipes().subscribe((data: any[]) => {
        this.recipes = data;
        console.log(data);
      });
    }


    /**
     * Moteur de recherche
     */
    onSearch(): void {
      const query = this.searchQuery.toLowerCase();
      this.filteredRecipes = this.recipes.filter(recipe =>
        // recipe.title.toLowerCase().includes(query) || recipe.description.toLowerCase().includes(query)
        recipe.title.toLowerCase().includes(query)
      );
    }


}
