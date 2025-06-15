import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class AddToWishlistService {
  private wishlistItems: Movie[] = [];
  private wishlistSubject = new BehaviorSubject<any[]>(this.wishlistItems);

  constructor() { }

  getWishlist(): Observable<any[]> {
    return this.wishlistSubject.asObservable();
  }

  addToWishlist(movie: any): void {
    const existingMovie = this.wishlistItems.find(item => item.id === movie.id);
    if (!existingMovie) {
      this.wishlistItems.push(movie);
      this.wishlistSubject.next([...this.wishlistItems]);
     
    }
  }

  removeFromWishlist(movieId: number): void {
    this.wishlistItems = this.wishlistItems.filter(movie => movie.id !== movieId);
    this.wishlistSubject.next([...this.wishlistItems]);
   
  }

  clearWishlist(): void {
    this.wishlistItems = [];
    this.wishlistSubject.next([...this.wishlistItems]);
  
  }

  isInWishlist(movieId: number): boolean {
    return this.wishlistItems.some(movie => movie.id === movieId);
  }
}