import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-to-top-button',
  standalone: true,
  imports: [],
  templateUrl: './to-top-button.component.html',
  styleUrl: './to-top-button.component.css'
})
export class ToTopButtonComponent {

  isVisible: boolean = false;

  // Détecte le scroll pour afficher ou masquer le bouton
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isVisible = scrollPosition > 300;

    // console.log('Scroll position:', scrollPosition, 'isVisible:', this.isVisible);
  }

  // Ramène la page en haut avec un défilement doux
  scrollToTop(): void {    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
