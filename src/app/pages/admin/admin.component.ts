import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe, RecipeService, Category } from '../../utils/services/recipe.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  // ----- Propriétés -----

  recipes: Recipe[] = [];
  categories: Category[] = [];
  nutritions: any[] = [];
  ingredients: any[] = [];

  recipe_form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    idCategory: new FormControl('', [Validators.required]),
    picture: new FormControl('', [Validators.required, Validators.minLength(2)]),
    duration: new FormControl('', [Validators.required, Validators.min(1)]),
    ingredient: new FormControl('', [Validators.required]),
    ingredients: new FormArray([]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    numberPeople: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2)]),
    idNutrition: new FormControl('', [Validators.required]),
    instructions: new FormControl('', [Validators.required])
  });


  // ----- Constructeur -----

  constructor(private recipeService: RecipeService) {}


  // ----- Méthodes -----

  ngOnInit(): void {
    this.getRecipes();
    this.getCategories();
    this.getNutritions();
    this.getIngredients();
  }

  /**
   * Obtenir recettes (depuis le service)
   */
  getRecipes(): void {
    this.recipeService.getRecipes().subscribe((recipes) => this.recipes = recipes);
  }

  /**
   * Obtenir les catégories (depuis le service)
   */
  getCategories(): void {
    this.recipeService.getCategories().subscribe((categories) => this.categories = categories);
  }

  /**
   * Obtenir les types de nutrition (depuis le service)
   */
  getNutritions(): void {
    this.recipeService.getNutritions().subscribe((data) => this.nutritions = data);
  }

  /**
   * Obtenir les ingrédients (depuis le service)
   */
  getIngredients(): void {
    this.recipeService.getIngredients().subscribe((data) => this.ingredients = data);
  }

  /**
   * Ajouter une recette
   */
  addRecipe(): void {
    if (this.recipe_form.valid) {
      const newRecipe: Recipe = {
        id: this.recipes.length > 0 ? this.recipes[this.recipes.length - 1].id + 1 : 1,
        title: this.recipe_form.value.title,
        idCategory: this.recipe_form.value.idCategory,
        picture: this.recipe_form.value.picture,
        duration: this.recipe_form.value.duration,
        numberPeople: this.recipe_form.value.numberPeople,
        description: this.recipe_form.value.description,
        idNutrition: this.recipe_form.value.idNutrition,
        instructions: this.recipe_form.value.instructions,
        seen: 0
      };

      this.recipeService.createRecipe(newRecipe).subscribe(() => {
        this.getRecipes();
        this.recipe_form.reset();
      });
    }
    else {
      console.log("Formulaire invalide");
    }
  }

  // --- createElement ---

  addIngredient(): void {
    const ingredientGroup = new FormGroup({
        id: new FormControl('', [Validators.required]), // ID de l'ingrédient
        quantity: new FormControl('', [Validators.required, Validators.min(1)]) // Quantité
    });
    (this.recipe_form.get('ingredients') as FormArray).push(ingredientGroup);
  }

  removeIngredient(index: number): void {
    (this.recipe_form.get('ingredients') as FormArray).removeAt(index);
  }


  addInstruction(): void {
    const instructionGroup = new FormGroup({
        text: new FormControl('', [Validators.required])
    });
    (this.recipe_form.get('instructions') as FormArray).push(instructionGroup);
  }

  removeInstruction(index: number): void {
      (this.recipe_form.get('instructions') as FormArray).removeAt(index);
  }


}
