import { Component } from '@angular/core';
import { Recipe, RecipeService } from '../../utils/services/recipe.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

    // ----- Propriétés -----

    // recipes: any[] = [];
    recipes: Recipe[] = [];
    

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
        this.recipes = data;
      });
    }


}
