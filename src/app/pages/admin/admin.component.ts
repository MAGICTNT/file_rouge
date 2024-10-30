import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

  // recipe_form: FormGroup = new FormGroup({
  //   title: new FormControl('', [Validators.required, Validators.minLength(2)]),
  //   idCategory: new FormControl('', [Validators.required]),
  //   picture: new FormControl('', [Validators.required, Validators.minLength(2)]),
  //   duration: new FormControl('', [Validators.required, Validators.min(1)]),
  //   ingredient: new FormControl('', [Validators.required]),
  //   ingredients: new FormArray([]),
  //   quantity: new FormControl('', [Validators.required, Validators.min(1)]),
  //   numberPeople: new FormControl('', [Validators.required, Validators.min(1)]),
  //   description: new FormControl('', [Validators.required, Validators.minLength(2)]),
  //   idNutrition: new FormControl('', [Validators.required]),
  //   instructions: new FormControl('', [Validators.required])
  // });

  recipe_form: FormGroup;


  // ----- Constructeur -----

  // constructor(private recipeService: RecipeService) {}

  constructor(private recipeService: RecipeService, private fb: FormBuilder) {
    this.recipe_form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      idCategory: ['', [Validators.required]],
      picture: ['', [Validators.required, Validators.minLength(2)]],
      duration: ['', [Validators.required, Validators.min(1)]],
      numberPeople: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      idNutrition: ['', [Validators.required]],
      ingredients: this.fb.array([this.createIngredient()]), // FormArray pour les ingrédients
      instructions: this.fb.array([this.createInstruction()]) // FormArray pour les instructions
    });
  }


  // ----- Méthodes -----

  ngOnInit(): void {
    this.getRecipes();
    this.getCategories();
    this.getNutritions();
    this.getIngredients();
  }

  /**
   * Récupère le FormArray des ingrédients
   */
  get ingredientsArray(): FormArray {
    return this.recipe_form.get('ingredients') as FormArray;
  }

  /**
   * Crée un nouvel ingrédient
   */
  createIngredient(): FormGroup {
    return this.fb.group({
      id: ['', Validators.required], // ID de l'ingrédient
      quantity: ['', [Validators.required, Validators.min(1)]] // Quantité
    });
  }

  /**
   * Ajouter un ingrédient
   */
  addIngredient(): void {
    this.ingredientsArray.push(this.createIngredient());
  }

  /**
   * Supprimer le dernier ingrédient
   */
  deleteIngredient(): void {
    if (this.ingredientsArray.length > 1) { // garde au moins un ingrédient
      this.ingredientsArray.removeAt(this.ingredientsArray.length - 1);
    }
  }

  /**
   * Ajouter une recette
   */
  addRecipe(): void {
    if (this.recipe_form.valid) {
      const newRecipe: any = {
        title: this.recipe_form.value.title,
        numberPeople: this.recipe_form.value.numberPeople,
        duration: this.recipe_form.value.duration,
        description: this.recipe_form.value.description,
        seen: 0,
        picture: this.recipe_form.value.picture,
        nutritionTitle: this.recipe_form.value.idNutrition,
        categoryTitle: this.recipe_form.value.idCategory,
        ingredients: this.recipe_form.value.ingredients.map((ing: any) => ({
          id: ing.id,
          title: this.ingredients.find(item => item.id === ing.id)?.title || '',
          quantity: ing.quantity
        })),
        instructions: this.recipe_form.value.instructions.map((inst: any) => inst.text)
      };
  
      this.recipeService.createRecipe(newRecipe).subscribe(() => {
        this.getRecipes(); // Rafraîchir les recettes
        this.recipe_form.reset();
      });
    }
    else {
      console.log("Formulaire invalide");
    }
  }
  

  // --- Instructions ---

  get instructions(): FormArray {
    return this.recipe_form.get('instructions') as FormArray;
  }

  createInstruction(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required]
    });
  }

  addInstruction(): void {
    this.instructions.push(this.createInstruction());
  }

  deleteInstruction(): void {
    if (this.instructions.length > 1) {
      this.instructions.removeAt(this.instructions.length - 1);
    }
  }

  // ----- Obtenir les données depuis le service -----

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe((recipes) => this.recipes = recipes);
  }

  getCategories(): void {
    this.recipeService.getCategories().subscribe((categories) => this.categories = categories);
  }

  getNutritions(): void {
    this.recipeService.getNutritions().subscribe((data) => this.nutritions = data);
  }

  getIngredients(): void {
    this.recipeService.getIngredients().subscribe((data) => this.ingredients = data);
  }

}
