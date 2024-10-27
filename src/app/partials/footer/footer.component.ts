import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToTopButtonComponent } from '../../components/to-top-button/to-top-button.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, ToTopButtonComponent],
  templateUrl: './footer.component.html',
  // styleUrl: './footer.component.css'
})
export class FooterComponent {

  isVisible: boolean = false;

  // Détecte le scroll pour afficher ou masquer le bouton
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isVisible = scrollPosition > 300;
  }

  // Ramène la page en haut avec un défilement doux
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  

}
