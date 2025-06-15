import { AddToWishlistService } from './../../service/add-to-wishlist.service';
import { Component } from '@angular/core';
import { CrudRequestService } from '../../service/crud-request.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../types/types';
import { UsernameService } from '../../service/username.service';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})

export class MoviesListComponent {
  movies: Movie[] = [];
  totalPages = 0;
  pageSize = 18;
  currentPage = 1;
  maxVisiblePages = 6;
  startIndex = 0;
  visiblePages: number[] = [];
  vote: number = 0
  username: string | null = '';

  constructor(private router: Router, private _crudService: CrudRequestService, private wishlistService: AddToWishlistService, private UserName: UsernameService) { }

  ngOnInit() {
    this.username = this.UserName.getUsername()
    this.loadMovies(this.currentPage);
  }

  loadMovies(page: number) {
    this._crudService.getMoviesListByPagination(page).subscribe({
      next: (data) => {
        this.movies = data.results.slice(0, 18);
        this.totalPages = data.total_pages;
        console.log(this.movies);

        this.currentPage = page;
        this.updateVisiblePages();
      },
      error: (err) => console.error('Error fetching movies:', err),
    });
  }

  updateVisiblePages() {
    this.visiblePages = Array.from(
      { length: Math.min(this.maxVisiblePages) },
      (value, index) => index + 1 + this.startIndex
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.loadMovies(page);
      this.currentPage = page;
    }

  }

  nextPageSet() {
    if (this.startIndex + this.maxVisiblePages < this.totalPages) {
      this.startIndex += this.maxVisiblePages;
      this.updateVisiblePages();
    }

  }

  previousPageSet() {
    if (this.startIndex > 0) {
      this.startIndex = Math.max(0, this.startIndex - this.maxVisiblePages);
      this.updateVisiblePages();
    }
  }

  trackByFn(index: number, movie: any): number {
    return movie.id;
  }

  toggleWishlist(movie: any, event: Event): void {
    event.preventDefault();
    if (this.isInWishlist(movie.id)) {
      this.wishlistService.removeFromWishlist(movie.id);
    } else {
      this.wishlistService.addToWishlist(movie);
    }
  }


  isInWishlist(movieId: number): boolean {
    return this.wishlistService.isInWishlist(movieId);
  }

  getBackgroundColor(vote: number): string {
    return this.vote > 7 ? 'green' : 'yellow';
  }
  handleMovieClick(movieId: number, event: Event) {
    event.preventDefault(); // prevent default anchor behavior

    const username = this.UserName.getUsername(); // or localStorage.getItem('username');

    if (username) {
      this.router.navigate(['/movie', movieId]);
    } else {
      // alert('Please log in or create a username to view movie details.');
      this.router.navigate(['/login']);
    }
  }


}
