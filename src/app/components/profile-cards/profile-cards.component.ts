import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-profile-cards',
  templateUrl: './profile-cards.component.html',
  styleUrls: ['./profile-cards.component.scss']
})
export class ProfileCardsComponent implements AfterViewInit {
  profileRows = [
    [
      { name: 'Addelyn', position: 'Database Administrator', image: 'assets/images/0.jpg' },
      { name: 'Olivia', position: 'Systems Analyst', image: 'assets/images/4.jpg' },
      { name: 'John', position: 'Web Developer', image: 'assets/images/21.jpg' },
      { name: 'Mia', position: 'Mobile Application Developer', image: 'assets/images/0.jpg' },
      { name: 'Emily', position: 'Software Engineer', image: 'assets/images/85.jpg' },
      { name: 'Sarah', position: 'Data Scientist', image: 'assets/images/90.jpg' },
      { name: 'Chris', position: 'Cybersecurity Specialist', image: 'assets/images/0.jpg' },
      { name: 'James', position: 'Frontend Developer', image: 'assets/images/21.jpg' },
    ],
    [
      { name: 'James', position: 'Frontend Developer', image: 'assets/images/0.jpg' },
      { name: 'Sophia', position: 'UX Designer', image: 'assets/images/85.jpg' },
      { name: 'Liam', position: 'Project Manager', image: 'assets/images/90.jpg' },
      { name: 'Emma', position: 'Business Analyst', image: 'assets/images/85.jpg' },
      { name: 'Noah', position: 'DevOps Engineer', image: 'assets/images/0.jpg' },
      { name: 'Ava', position: 'Product Manager', image: 'assets/images/21.jpg' },
      { name: 'Lucas', position: 'Cloud Architect', image: 'assets/images/85.jpg' },
      { name: 'James', position: 'Frontend Developer', image: 'assets/images/0.jpg' },
    ],
    [
      { name: 'Emily', position: 'Software Engineer', image: 'assets/images/85.jpg' },
      { name: 'Sarah', position: 'Data Scientist', image: 'assets/images/90.jpg' },
      { name: 'Chris', position: 'Cybersecurity Specialist', image: 'assets/images/4.jpg' },
      { name: 'James', position: 'Frontend Developer', image: 'assets/images/21.jpg' },
      { name: 'Addelyn', position: 'Database Administrator', image: 'assets/images/4.jpg' },
      { name: 'Olivia', position: 'Systems Analyst', image: 'assets/images/4.jpg' },
      { name: 'John', position: 'Web Developer', image: 'assets/images/21.jpg' },
      { name: 'Mia', position: 'Mobile Application Developer', image: 'assets/images/91.jpg' },
    ],
    [
      { name: 'Noah', position: 'DevOps Engineer', image: 'assets/images/0.jpg' },
      { name: 'Ava', position: 'Product Manager', image: 'assets/images/21.jpg' },
      { name: 'Lucas', position: 'Cloud Architect', image: 'assets/images/85.jpg' },
      { name: 'James', position: 'Frontend Developer', image: 'assets/images/0.jpg' },
      { name: 'James', position: 'Frontend Developer', image: 'assets/images/0.jpg' },
      { name: 'Sophia', position: 'UX Designer', image: 'assets/images/85.jpg' },
      { name: 'Liam', position: 'Project Manager', image: 'assets/images/90.jpg' },
      { name: 'Emma', position: 'Business Analyst', image: 'assets/images/85.jpg' },
    ],

  ];

  speeds = [20, 20, 20, 20, 20];

  ngAfterViewInit() {
    if (typeof document !== 'undefined') {
      const cardRows = document.querySelectorAll('.card-row');

      cardRows.forEach((row, rowIndex) => {
        const cardColumns = row.querySelectorAll('.profile-card');
        cardColumns.forEach((column, colIndex) => {
          const duration = this.speeds[colIndex % this.speeds.length];
          gsap.fromTo(column,
            { x: -1800, y: -1800 },
            { x: 1000, y: 1000, duration: duration, repeat: -1, yoyo: false, ease: 'linear' }
          );
        });
      });
    }
  }

}
