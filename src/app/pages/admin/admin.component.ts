import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe, RecipeService } from '../../utils/services/recipe.service';

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

  recipe_form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),

    category: new FormControl('', [Validators.required]),

    image: new FormControl('', [Validators.required, Validators.minLength(2)]),

    time: new FormControl('', [Validators.required, Validators.min(1)]),

    person: new FormControl('', [Validators.required, Validators.min(1)]),

    calorie: new FormControl('', [Validators.required, Validators.min(0)]),

    description: new FormControl('', [Validators.required, Validators.minLength(2)]),

    ingredients: new FormControl('', [Validators.required]),

    instructions: new FormControl('', [Validators.required])
  });


  // ----- Constructeur -----

  constructor(private recipeService: RecipeService) {
  }


  // ----- Méthodes -----

  ngOnInit(): void {
    this.getRecipes();
  }


  /**
   * Obtenir recettes (depuis le service)
   */
  getRecipes(): void {
    this.recipes = this.recipeService.recipes;
  }


  /**
   * Ajouter une recette
   */
  addRecipe(): void {
    if (this.recipe_form.valid) {

      const newRecipe: Recipe = {
        id: this.recipes.length > 0 ? this.recipes[this.recipes.length - 1].id + 1 : 1,

        title: this.recipe_form.value.title,

        category: this.recipe_form.value.category,

        image: this.recipe_form.value.image,

        time: this.recipe_form.value.time,

        person: this.recipe_form.value.person,

        calorie: this.recipe_form.value.calorie,

        description: this.recipe_form.value.description,

        ingredients: this.recipe_form.value.ingredients,
        
        instructions: this.recipe_form.value.instructions
      };

      this.recipeService.createRecipe(newRecipe);
      console.log(newRecipe);

      this.getRecipes();

      this.recipe_form.reset({ // Vider formulaire
        title: '',
        category: '',
        image: '',
        time: '',
        person: '',
        calorie: '',
        description: '',
        ingredients: '',
        instructions: ''
      });
    }
    else {
      console.log("Formulaire invalide");
    }
  }


}
