import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchServiceService } from '../service/search-service.service';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CrudRequestService } from '../service/crud-request.service';
import { AddToWishlistService } from '../service/add-to-wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-search',
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.css'
})

export class MovieSearchComponent {
  searchKey: string | null = '';
  movies: any[] = [];
  vote : number = 0

  constructor(private route: ActivatedRoute , private movieService: SearchServiceService, private wishlistService: AddToWishlistService ,private crudService : CrudRequestService) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.searchKey = params.get('searchKey') || '';
      // if (this.searchKey) {
        this.searchMovies(this.searchKey);
      // }
    });
  }

  searchMovies(searchKey: string) {
    if (searchKey.trim() === '') {
      this.crudService.getMoviesList().subscribe(response => {
        this.movies = response.results || [];
      });
    } else {
      // Fetch search results
      this.movieService.searchMovies(searchKey).subscribe(response => {
        this.movies = response.results || [];
      });
  }
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

getBackgroundColor(vote:number): string {
  return this.vote > 7 ? 'green' : 'yellow';
}

}
