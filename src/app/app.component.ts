import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { AdminComponent } from './pages/admin/admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, HeaderComponent, FooterComponent, RecipeComponent, RecipesComponent, AdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front_project';
}
