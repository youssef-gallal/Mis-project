import { Component } from '@angular/core';
import { AddToWishlistService } from '../service/add-to-wishlist.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule,RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

  wishlistItems: Observable<any[]>;

  constructor(private wishlistService: AddToWishlistService) {
    this.wishlistItems = this.wishlistService.getWishlist();
  }

  removeFromWishlist(movieId: number): void {
    this.wishlistService.removeFromWishlist(movieId);
  }

}
