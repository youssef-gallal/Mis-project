import { AccLangService } from './acc-lang.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CrudRequestService {

  constructor(private http: HttpClient, private langService: AccLangService) {}

  getMoviesListByPagination(page: number): Observable<any> {
    const language = this.langService.getLanguage();
    return this.http.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${environment.apiKey}&page=${page}&language=${language}`
    );
  }
  getMoviesList(): Observable<any> {
    const language = this.langService.getLanguage();
    return this.http.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${environment.apiKey}&language=${language}`
    );
  }

  getMovieDetails(id: number ) {
    const language = this.langService.getLanguage();
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${environment.apiKey}&language=${language}`
    );
  }

  getMovieRecommendations(movie_id: number) {
    const language = this.langService.getLanguage();
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${environment.apiKey}&language=${language}`
    );
  }
}
