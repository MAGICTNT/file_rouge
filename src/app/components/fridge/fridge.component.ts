import { Component } from '@angular/core';
import { IngredientService } from '../../utils/services/ingredient.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-fridge',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fridge.component.html',
  styleUrl: './fridge.component.css',
})
export class FridgeComponent {
  fridgeItems: any[] = [];
  selectOptions: string[] = [];
  ingredient_form: FormGroup = new FormGroup({
    ingredient: new FormControl([Validators.required]),
    quantity: new FormControl([Validators.required, Validators.min(1)]),
  });

  constructor(private ingredientService: IngredientService) {
    this.ingredientService.getAllIngredients().subscribe((ingredients) => {
      ingredients.forEach((ingredient) => {
        this.selectOptions.push(ingredient.title);
      });
      this.ingredient_form.setValue({
        ingredient: this.selectOptions[0],
        quantity: 1,
      });
    });

    this.fridgeItems = JSON.parse(localStorage.getItem('fridge') ?? '[]');
  }

  addToFridge() {
    const ingredient = this.fridgeItems.find(
      (item: any) => item.ingredient === this.ingredient_form.value.ingredient
    );
    if (ingredient) {
      ingredient.quantity += this.ingredient_form.value.quantity;
    } else {
      this.fridgeItems.push({
        ingredient: this.ingredient_form.value.ingredient,
        quantity: this.ingredient_form.value.quantity,
      });
    }
    localStorage.setItem('fridge', JSON.stringify(this.fridgeItems));
  }

  showQuantityInput(index: number, item: any) {
    const quantity: HTMLSpanElement | null = document.querySelector(
      `#quantity${index}`
    );
    const quantityInput: HTMLSpanElement | null = document.querySelector(
      `#quantityInput${index}`
    );

    quantity?.setAttribute('hidden', '');
    if (quantityInput) {
      quantityInput.style.display = 'inline-grid';
      quantityInput.dataset['value'] = item.quantity;
    }
  }

  changeQuantity(index: number, item: any) {
    const quantity: HTMLSpanElement | null = document.querySelector(
      `#quantity${index}`
    );
    const quantityInput: HTMLSpanElement | null = document.querySelector(
      `#quantityInput${index}`
    );
    const input: HTMLInputElement | null = document.querySelector(
      `#quantityInput${index} input`
    );

    if (input) {
      if (!isNaN(parseInt(input.value))) item.quantity = parseInt(input.value);
      else input.value = item.quantity;
    }

    localStorage.setItem('fridge', JSON.stringify(this.fridgeItems));

    quantity?.removeAttribute('hidden');
    if (quantityInput) quantityInput.style.display = 'none';
  }

  removeFromFridge(item: any) {
    this.fridgeItems = this.fridgeItems.filter(
      (i: any) => i.ingredient !== item.ingredient
    );
    localStorage.setItem('fridge', JSON.stringify(this.fridgeItems));
  }
}
