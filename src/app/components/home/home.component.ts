import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const sections = document.querySelectorAll('.fade-in-section');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.3
      });

      sections.forEach(section => {
        observer.observe(section);
      });
    }


    if (isPlatformBrowser(this.platformId)) {
      const phceEls = document.querySelectorAll(".phce") || [];
      phceEls.forEach(phceEl => phceEl.addEventListener("pointermove", this.phceSetPositions));
    }
  }

  phceSetPositions = ({ currentTarget: el, layerX: x, layerY: y }: any) => {
    const { width: w, height: h } = el.getBoundingClientRect();
    el.style.setProperty("--posX", this.phceMapPositions(x, [0, w]).toString());
    el.style.setProperty("--posY", this.phceMapPositions(y, [0, h]).toString());
  }

  phceMapPositions(value: number, from: number[], to: number[] = [-1, 1], decimals: number = 2): number {
    const newValue = (value - from[0]) * (to[1] - to[0]) / (from[1] - from[0]) + to[0];
    const val = Math.min(Math.max(newValue, to[0]), to[1]);
    return decimals && decimals > 0 ? Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals) : val;
  }
}
