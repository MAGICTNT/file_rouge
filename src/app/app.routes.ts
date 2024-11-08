import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { isAdminGuard } from './utils/guards/is-admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { isLoggedGuard } from './utils/guards/is-logged.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent, data: { title: 'Accueil - Site de recettes'}}, // http://localhost:4200/
    {path: 'recette/:id', component: RecipeComponent, data: { title: 'Détail de la recette', breadcrumb: 'Détail de la recette' } },
    {path: 'recettes', component: RecipesComponent, data: { title: 'Toutes nos recettes', breadcrumb: 'Liste de Recettes' }}, // http://localhost:4200/recettes
    // {path: 'admin', component: AdminComponent, canActivate: [isAdminGuard], data: { breadcrumb: 'Admin' }},
    {path: 'admin', component: AdminComponent, data: { title: 'Espace Admin', breadcrumb: 'Admin' }},
    {path: 'login', component: LoginComponent, data: { title: 'Connexion', breadcrumb: 'Connexion' }},
    {path: 'register', component: RegisterComponent, data: { title: 'Inscription', breadcrumb: 'Inscription' }},
    {path: 'profile', component: ProfileComponent, canActivate: [isLoggedGuard], data: { title: 'Espace Membre - Profil', breadcrumb: 'Profil' }},
];
