import { Component } from '@angular/core';
import { Recipe, RecipeService } from '../../utils/services/recipe.service';
import { ActivatedRoute } from '@angular/router'; // ActivatedRoute permet de récupérer les paramètres de l'URL actuel
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

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
  ingredientsDetails: { title: string; quantity: number; unit: string }[] = [];
  isFavorite: boolean = false;
  

  // ----- Constructeur -----

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,

    private titleService: Title // Injecter Title
  ) {}


  // ----- Méthodes -----

  // ngOnInit(): void {
  //   const recipeId = Number(this.route.snapshot.paramMap.get('id'));
    
  //   this.getRecipe(); // Récupère la recette

  //   this.recipeService.getRecipeById(recipeId).subscribe((data) => {
  //     this.recipe = data;
  //     console.log('Ingrédients de la recette :', this.recipe.ingredients);
  //     this.isFavorite = this.checkIfFavorite(recipeId);

  //     this.recipeService.getIngredients().subscribe(allIngredients => {
  //       this.ingredientsDetails = this.recipe?.ingredients.map(ing => {
  //         const ingredientDetail = allIngredients.find(ingredient => ingredient.id === ing.id);
  //         return {
  //           title: ingredientDetail?.title || '',
  //           quantity: ing.quantity,
  //           unit: ingredientDetail?.unit || ''
  //         };
  //       }) || [];
  //     });
  //   });
  // }


  // getRecipe(): void {
  //   const id = Number(this.route.snapshot.paramMap.get('id')); // Récupération de l'ID depuis l'URL
  //   this.recipeService.getRecipeById(id).subscribe(recipe => {
  //     this.recipe = recipe; // Stockage des données de la recette
  //   });
  // }


  ngOnInit(): void {
    const recipeId = Number(this.route.snapshot.paramMap.get('id'));
    this.getRecipe(recipeId);
  }

  getRecipe(recipeId: number): void {
    this.recipeService.getRecipeById(recipeId).subscribe((data) => {
      this.recipe = data;
      this.isFavorite = this.checkIfFavorite(recipeId);

      this.titleService.setTitle(this.recipe?.title || 'Détail de la recette'); // Titre de la page avec le titre de la recette (titre par défaut si aucun titre : Détail de la recette)

      // Récupérer les détails des ingrédients :
      this.recipeService.getIngredients().subscribe(allIngredients => {
        this.ingredientsDetails = this.recipe?.ingredients.map(ing => {
          const ingredientDetail = allIngredients.find(ingredient => ingredient.id === ing.id);
          return {
            title: ingredientDetail?.title || '',
            quantity: ing.quantity,
            unit: ingredientDetail?.unit || ''
          };
        }) || [];
      });
    });
  }


  // ----- Gérer favoris -----

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.addToFavorites(this.recipe!.id);
    }
    else {
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
