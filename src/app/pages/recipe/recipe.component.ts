import { Component } from '@angular/core';
import { Recipe, RecipeService } from '../../utils/services/recipe.service';
import { ActivatedRoute } from '@angular/router'; // ActivatedRoute permet de récupérer les paramètres de l'URL actuel

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  templateUrl: './recipe.component.html',
  // styleUrl: './recipe.component.css'
})
export class RecipeComponent {

  // ----- Propriétés -----

  recipe!: Recipe;
  

  // ----- Constructeur -----

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}


  // ----- Méthodes -----

  ngOnInit(): void {
    this.getRecipe(); // Récupère la recette
  }


  getRecipe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Récupération de l'ID depuis l'URL
    this.recipeService.getRecipeById(id).subscribe(recipe => {
      this.recipe = recipe; // Stockage des données de la recette
    });
  }

}
