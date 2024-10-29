import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { isAdminGuard } from './utils/guards/is-admin.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent}, // http://localhost:4200/
    {path: 'recette', component: RecipeComponent, data: { breadcrumb: 'Recette' }}, // http://localhost:4200/recette
    { path: 'recette/:id', component: RecipeComponent, data: { breadcrumb: 'Détail de la recette' } },
    {path: 'recettes', component: RecipesComponent, data: { breadcrumb: 'Liste de Recettes' }}, // http://localhost:4200/recettes
    {path: 'admin', component: AdminComponent, canActivate: [isAdminGuard], data: { breadcrumb: 'Admin' }}, // http://localhost:4200/admin
    {path: 'login', component: LoginComponent, data: { breadcrumb: 'Connexion' }},
    {path: 'register', component: RegisterComponent, data: { breadcrumb: 'Inscription' }},
    // TODO: ajouter le isLoggedGuard sur la page de profil quand elle sera faite
];
