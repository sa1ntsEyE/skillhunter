import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  private lastScrollTop = 0;
  private currentIndex = -1;

  constructor(@Inject(PLATFORM_ID) private platformId: Object ) {}

  showGallery = false;
  galleryImages: string[] = [];
  currentImageIndex = 0;

  openGallery(images: string[]): void {
    this.galleryImages = images;
    this.currentImageIndex = 0;
    this.showGallery = true;
  }

  closeGallery(event?: MouseEvent): void {
    if (event && (event.target as HTMLElement).classList.contains('gallery-modal')) {
      this.showGallery = false;
    } else {
      this.showGallery = false;
    }
  }

  get currentImage(): string {
    return this.galleryImages[this.currentImageIndex];
  }

  prevImage(): void {
    if (this.galleryImages.length > 1) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
    }
  }

  nextImage(): void {
    if (this.galleryImages.length > 1) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryImages.length;
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {

      const titles = document.querySelectorAll('.info--title');
      const sections = document.querySelectorAll('.fade-in-section');

      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      const observerOptions2 = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      const observer2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const index = Array.from(titles).indexOf(entry.target as HTMLElement);

          if (entry.isIntersecting) {
            if (this.currentIndex !== index) {
              this.highlightTitle(index);
              this.currentIndex = index;
            }
          } else if (this.currentIndex === index) {
            this.dimTitle(index);
          }
        });
      }, observerOptions2);



      sections.forEach(section => observer.observe(section));
      titles.forEach(title => observer2.observe(title));
    }
  }

  private highlightTitle(index: number): void {
    const titles = document.querySelectorAll('.info--title');
    titles.forEach((title, i) => {
      if (i === index) {
        title.classList.add('is-visible');
      } else {
        title.classList.remove('is-visible');
      }
    });
  }

  private dimTitle(index: number): void {
    const titles = document.querySelectorAll('.info--title');
    titles[index].classList.remove('is-visible');
  }
}
