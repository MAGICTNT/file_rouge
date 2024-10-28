import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
// export class SliderComponent implements OnInit {
export class SliderComponent implements AfterViewInit {

  // ----- Propriétés -----

  slide1 = document.getElementById("slide1");

  images = [
    { src: 'assets/img/1.jpg', alt: 'Image 1' },
    { src: 'assets/img/2.jpg', alt: 'Image 2' },
    { src: 'assets/img/3.jpg', alt: 'Image 3' },
    { src: 'assets/img/4.jpg', alt: 'Image 4' },
    { src: 'assets/img/5.jpg', alt: 'Image 5' },
    { src: 'assets/img/6.jpg', alt: 'Image 6' }
  ];

  // ----- Méthodes -----

  /**
   * Appeler le slider au chargement
   */
  // ngOnInit(): void {
  ngAfterViewInit(): void {

    // console.log('On init ok');

    const slide1 = document.getElementById("slide1");
    if (slide1) {
      this.slider(slide1, 3);
    }
    else {
      console.log('Element introuvable');
    }
  }


  /**
   * Slider pour top recettes
   * @param el 
   * @param nb 
   */
  slider(el: HTMLElement, nb: number = 3) {
    let ratio: number = 2;
    let slideIndex: number = 0;
    const slide = el.querySelector(".slide") as HTMLElement;
    const slideImg = el.querySelectorAll(".slide img") as NodeListOf<HTMLImageElement>;
    const dots = el.getElementsByClassName("dot");

    if (!nb) { nb = 3; }

    // console.log(slideImg); // ok

    function slideGoto(n: number) {
      console.log(slideIndex);
      
      if (n > Math.ceil((slideImg.length / ratio)-1)) { slideIndex = 0; }
      if (n < 0) { slideIndex = Math.ceil((slideImg.length / ratio)) - 1; }

      slide.style.transform = "translateX(-" + (slideIndex * 100) + "%)";

      el.querySelector(".dot.active")?.classList.remove("active");
      dots[slideIndex]?.classList.add("active");
    }

    const slidePrev = () => {
      slideGoto(slideIndex--);
    }

    const slideNext = () => {
      slideGoto(slideIndex++);
    }

    el.querySelector(".slide-left")?.addEventListener("click", slidePrev);
    el.querySelector(".slide-right")?.addEventListener("click", slideNext);

    setInterval(slideNext, 9000);

    const currentSlide = (e: Event) => {
      const target = e.target as HTMLElement;
      slideIndex = parseInt(target.getAttribute("data-target") || "0", 10);
      slideGoto(slideIndex);
    }

    const eventDot = () => {
      for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", currentSlide);
      }
    }

    let startX = 0;
    let endX = 0;

    function dragEnd(e: MouseEvent | TouchEvent) {
        endX = (e.type === "touchend") ? (e as TouchEvent).changedTouches[0].screenX : (e as MouseEvent).screenX;

        if (endX < startX) {
            slideNext();
        }
        else if (endX > startX) {
            slidePrev();
        }
    }

    function dragStart(e: MouseEvent | TouchEvent) {
        startX = (e.type === "touchstart") ? (e as TouchEvent).changedTouches[0].screenX : (e as MouseEvent).screenX;
        slide.addEventListener("touchend", dragEnd);
        slide.addEventListener("mouseup", dragEnd);
    }

    slide.addEventListener("touchstart", dragStart);
    slide.addEventListener("mousedown", dragStart);

    function onWindowResize() {
      ratio = window.matchMedia("(max-width: 800px)").matches ? 1 : nb;

      const items = el.querySelectorAll(".slide > div");
      for (let i = 0; i < items.length; i += 1) {
        (items[i] as HTMLElement).style.width = (100 / ratio) + "%";
      }

      const dotContainer = el.querySelector(".dot-container") as HTMLElement;
      while (dotContainer.hasChildNodes()) {
        dotContainer.removeChild(dotContainer.firstChild as ChildNode);
      }

      for (let i = 0; i < slideImg.length / ratio; i++) {
        const node = document.createElement("span");
        node.setAttribute("class", i === 0 ? "dot active" : "dot");
        node.setAttribute("data-target", i.toString());
        dotContainer.appendChild(node);
      }

      slideIndex = 0;
      slideGoto(slideIndex);
      eventDot();
    }

    onWindowResize();
    window.addEventListener("resize", onWindowResize);
  }


}
