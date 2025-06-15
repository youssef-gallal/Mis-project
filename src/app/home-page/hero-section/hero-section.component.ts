import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [FormsModule],

  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})

export class HeroSectionComponent {
  searchKey: string = '';

  constructor(private router: Router) {}

  searchMovies() {
    if (!this.searchKey.trim()) {
      alert('Please enter a movie.');
    } else {
      this.router.navigate(['/search', this.searchKey]);
    }
  }
}
