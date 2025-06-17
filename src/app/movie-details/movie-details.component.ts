import { Component } from '@angular/core';
import { CrudRequestService } from '../service/crud-request.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AddToWishlistService } from '../service/add-to-wishlist.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-details',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movieId!: number;
  movie: any;
  recommendations: any;
  vote: number = 0;
  movieComment: string = '';
  movieComments = new Map<number, string[]>(); // Map of movieId to comments

  constructor(
    private route: ActivatedRoute,
    private _crudRequestService: CrudRequestService,
    private wishlistService: AddToWishlistService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movieId = Number(params.get('id'));
      this.fetchMovieDetails();
      this.fetchRecommendations();
      this.loadComments(); // 👈 load from localStorage
    });
  }

  fetchMovieDetails() {
    this._crudRequestService.getMovieDetails(this.movieId).subscribe({
      next: (data) => (this.movie = data)
    });
  }

  fetchRecommendations() {
    this._crudRequestService.getMovieRecommendations(this.movieId).subscribe({
      next: (data) => (this.recommendations = data)
    });
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
    return vote > 7 ? 'green' : 'yellow';
  }

  submitComment() {
    if (!this.movieComment.trim()) return;
    const comments = this.movieComments.get(this.movieId) || [];
    comments.push(this.movieComment.trim());
    this.movieComments.set(this.movieId, comments);
    this.movieComment = '';
    this.saveComments(); // 👈 save to localStorage
  }

  deleteComment(index: number) {
    const comments = this.movieComments.get(this.movieId);
    if (comments) {
      comments.splice(index, 1);
      this.movieComments.set(this.movieId, comments);
      this.saveComments(); // 👈 update localStorage
    }
  }

  getComments(): string[] {
    return this.movieComments.get(this.movieId) || [];
  }

  saveComments() {
    const obj: Record<number, string[]> = {};
    this.movieComments.forEach((value, key) => {
      obj[key] = value;
    });
    localStorage.setItem('movieComments', JSON.stringify(obj));
  }

  loadComments() {
    const data = localStorage.getItem('movieComments');
    if (data) {
      const parsed = JSON.parse(data);
      Object.keys(parsed).forEach(key => {
        this.movieComments.set(Number(key), parsed[key]);
      });
    }
  }
}
