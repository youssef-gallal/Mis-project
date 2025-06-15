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
    });
  }

  fetchMovieDetails() {
    this._crudRequestService.getMovieDetails(this.movieId).subscribe({
      next: (data) => {
        this.movie = data;
      }
    });
  }

  fetchRecommendations() {
    this._crudRequestService.getMovieRecommendations(this.movieId).subscribe({
      next: (data) => {
        this.recommendations = data;
      }
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
    return this.vote > 7 ? 'green' : 'yellow';
  }
  submitComment() {
    console.log('Movie-ID', this.movieId, 'User comment:', this.movieComment);
    this.movieComment = ''
  }

}
