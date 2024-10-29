import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { isAdminGuard } from './utils/guards/is-admin.guard';
import { FridgeComponent } from './components/fridge/fridge.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { isLoggedGuard } from './utils/guards/is-logged.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent}, // http://localhost:4200/
    {path: 'recette', component: RecipeComponent}, // http://localhost:4200/recette
    {path: 'recette/:id', component: RecipeComponent, data: { breadcrumb: 'Détail de la recette' } },
    {path: 'recettes', component: RecipesComponent}, // http://localhost:4200/recettes
    {path: 'admin', component: AdminComponent, canActivate: [isAdminGuard]}, // http://localhost:4200/admin
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [/* isLoggedGuard */]},
    {path: 'fridge', component: FridgeComponent}, // TMP
];
