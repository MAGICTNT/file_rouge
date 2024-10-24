import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
    {path: '', component: HomeComponent}, // http://localhost:4200/
    {path: 'recette', component: RecipeComponent}, // http://localhost:4200/recette
    {path: 'recettes', component: RecipesComponent}, // http://localhost:4200/recettes
    {path: 'admin', component: AdminComponent}, // http://localhost:4200/admin
];
