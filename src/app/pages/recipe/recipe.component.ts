import { Component } from '@angular/core';
import { Recipe, RecipeService } from '../../utils/services/recipe.service';
import { ActivatedRoute } from '@angular/router'; // ActivatedRoute permet de récupérer les paramètres de l'URL actuel
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe.component.html',
  // styleUrl: './recipe.component.css'
})
export class RecipeComponent {

  // ----- Propriétés -----

  // recipe!: Recipe;
  recipe: Recipe | undefined;
  isFavorite: boolean = false;
  

  // ----- Constructeur -----

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}


  // ----- Méthodes -----

  ngOnInit(): void {
    const recipeId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.getRecipe(); // Récupère la recette

    this.recipeService.getRecipeById(recipeId).subscribe((data) => {
      this.recipe = data;
      this.isFavorite = this.checkIfFavorite(recipeId);
    });
  }


  getRecipe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Récupération de l'ID depuis l'URL
    this.recipeService.getRecipeById(id).subscribe(recipe => {
      this.recipe = recipe; // Stockage des données de la recette
    });
  }


  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.addToFavorites(this.recipe!.id);
    } else {
      this.removeFromFavorites(this.recipe!.id);
    }
  }

  private addToFavorites(recipeId: number): void {
    const favorites = this.getFavorites();
    favorites.push(recipeId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  private removeFromFavorites(recipeId: number): void {
    const favorites = this.getFavorites().filter(id => id !== recipeId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  private checkIfFavorite(recipeId: number): boolean {
    return this.getFavorites().includes(recipeId);
  }

  private getFavorites(): number[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

}
