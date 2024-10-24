import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipeComponent } from './pages/recipe/recipe.component';

export const routes: Routes = [
    {path: '', component: HomeComponent}, // http://localhost:4200/
    {path: 'recette', component: RecipeComponent} // http://localhost:4200/recette

];
