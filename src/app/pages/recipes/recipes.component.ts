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
      this.getRecipes();
    }

    
    /**
     * Récupère toutes les recettes depuis le service
     */
    getRecipes(): void {
      this.recipesService.getRecipes().subscribe((data: any[]) => {
        console.log(data);

        // this.recipes = data;
        // this.filteredRecipes = data;

        this.recipes = data.map(item => item.recipe); // Extraire uniquement les recettes
        this.filteredRecipes = this.recipes; // Mettre à jour les recettes filtrées
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
