import { AccLangService } from './../service/acc-lang.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AddToWishlistService } from '../service/add-to-wishlist.service';
import { CommonModule, Location } from '@angular/common';
import { UsernameService } from '../service/username.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  selectedLanguage: string = 'En';
  wishlistCount$: Observable<number>;
  username: string | null = ''
  constructor(private AccLangService: AccLangService, private wishlistService: AddToWishlistService, private router: Router, private location: Location, private Username: UsernameService) {
    this.selectedLanguage = this.AccLangService.getLanguage().toUpperCase();
    this.wishlistCount$ = this.wishlistService.getWishlist().pipe(
      map(movies => movies.length)
    );
  }
  ngOnInit(): void {
    this.username = this.Username.getUsername()

  }



  changeLanguage(lang: string) {
    this.AccLangService.setLanguage(lang);
    this.selectedLanguage = lang.toUpperCase();
  }

  handleClose() {
    let nav = document.getElementById("nav-header");
    console.log("closed");
    if (!nav) return;
    nav.style.right = nav.style.right === '-50%' ? '0%' : '-50%';
  }

  handleBars() {
    let nav = document.getElementById("nav-header");

    if (!nav) return;
    nav.style.right = nav.style.right === '50%' ? '0%' : '-50%';
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.clear()
  }

}
