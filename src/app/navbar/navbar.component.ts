import { AccLangService } from './../service/acc-lang.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AddToWishlistService } from '../service/add-to-wishlist.service';
import { CommonModule, Location } from '@angular/common';
import { AuthRequestService } from '../service/auth-request.service';
import { HttpClient } from '@angular/common/http';

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
  loginuser: any[] = [];
  // loginid: number = '';

  constructor(private http: HttpClient, private AccLangService: AccLangService, private wishlistService: AddToWishlistService, private router: Router, private location: Location, private auth: AuthRequestService) {
    this.selectedLanguage = this.AccLangService.getLanguage().toUpperCase();
    this.wishlistCount$ = this.wishlistService.getWishlist().pipe(
      map(movies => movies.length)
    );
  }
  ngOnInit(): void {
    this.getlogin()
  }

  getlogin() {
    this.auth.getlogin().subscribe(res => {
      this.loginuser = res
      console.log(res);
    })
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



  //   logout(): void {
  //     const deleteRequests = this.loginuser.map(user =>
  //       this.auth.deletelogin(this.loginid));
  //     this.getlogin()
  //     this.router.navigate(['/login']);
  //   };
  // }
  // logout(): void {
  //   this.http.delete(`http://localhost:3000/login/${this.loginid}`).subscribe(() => {
  //     console.log('Login entry deleted');
  //     this.router.navigate(['/login']);
  //     this.getlogin()
  //   });
  // }
  logout(): void {

    this.router.navigate(['/login']);
  }
}