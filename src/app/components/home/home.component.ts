import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  private lastScrollTop = 0;
  private currentIndex = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {

      const titles = document.querySelectorAll('.info--title');
      const titleObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      };

      const titleObserver = new IntersectionObserver(this.handleIntersection, titleObserverOptions);
      titles.forEach(title => titleObserver.observe(title));


      const sections = document.querySelectorAll('.fade-in-section');
      const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            sectionObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      sections.forEach(section => sectionObserver.observe(section));

      const phceEls = document.querySelectorAll(".phce") || [];
      phceEls.forEach(phceEl => phceEl.addEventListener("pointermove", this.phceSetPositions));
    }
  }

  handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      const index = Array.from(document.querySelectorAll('.info--title')).indexOf(entry.target as Element);
      if (entry.isIntersecting) {
        this.activateTitle(index);
      }
    });
  };

  activateTitle(index: number) {
    const titles = document.querySelectorAll('.info--title');
    titles.forEach((title, i) => {
      if (i === index) {
        title.classList.add('active');
      } else {
        title.classList.remove('active');
      }
    });
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
