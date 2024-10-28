import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  // styleUrl: './header.component.css'
})
export class HeaderComponent {

  messages: string[] = [
    "Profitez de nos recettes délicieuses !",
    "Cuisiner, c'est l'art de transformer des ingrédients en amour.",
    "L'avantage d'un plat fait maison : pas de calories de culpabilité !",
    "Manger est un besoin, cuisiner est un art.",
    "Mangez, Buvez et Soyez Heureux : Recettes pour échapper à la Cuisine !",
    "Le Guide des Recettes : Comment ne pas brûler votre Cuisine !"
  ];

  randomMessage: string = this.messages[Math.floor(Math.random() * this.messages.length)];


  /**
   * Fermer le menu burger sur mobile au changement de page (car sur Angular c'est one-page, le menu reste comme si on n'a pas changé de page)
   */
  closeMenu() {
    const checkbox = document.querySelector('.nav-icon input') as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
  }


}
