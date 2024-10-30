import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../utils/services/users/users.service';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../components/slider/slider.component';
import { Recipe, RecipeService } from '../../utils/services/recipe.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SliderComponent, RouterLink],
  templateUrl: './home.component.html',
  // styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  // ----- Propriétés -----

  topViewedRecipes: Recipe[] = [];

  latestRecipes: Recipe[] = [];

  // text: string = ""


  // ----- Constructeur -----

  constructor(private usersService: UsersService, private recipeService: RecipeService) {}


  // ----- Méthodes -----

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((data: any[]) => {
      this.topViewedRecipes = data
        .map(item => item.recipe) // Extraire uniquement les recettes
        .sort((a, b) => b.seen - a.seen) // Trie les recettes par ordre décroissant des vues
        .slice(0, 4); // Sélectionne les 4 premières après le tri
    });
  
    this.recipeService.getRecipes().subscribe((data: any[]) => {
      this.latestRecipes = data
        .map(item => item.recipe) // Extraire uniquement les recettes
        .slice(-4) // Afficher les 4 dernières recettes
        .reverse(); // Inverser l'ordre
    });
  }


}
