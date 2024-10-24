import { Component } from '@angular/core';
import { RecipeService } from '../../utils/services/recipe.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

    // ----- Propriétés -----

    // recipes: Recipe[] = [];
    recipes: any[] = [];


    // ----- Constructeur -----
  
    constructor(private recipesService: RecipeService) { }

  
  
    // ----- Méthodes -----

    ngOnInit(): void {
      this.loadRecipes();
    }

    loadRecipes(): void {
      this.recipesService.getRecipes().subscribe((data: any[]) => {
        this.recipes = data;
      });
    }



}
