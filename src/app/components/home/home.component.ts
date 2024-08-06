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

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      titles.forEach(title => observer.observe(title));
      sections.forEach(section => observer.observe(section));
    }
  }

  private handleIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }
}
