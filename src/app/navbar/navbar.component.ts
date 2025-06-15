import { AccLangService } from './../service/acc-lang.service';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AddToWishlistService } from '../service/add-to-wishlist.service';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  selectedLanguage: string = 'En';
  wishlistCount$: Observable<number>;

  constructor(private AccLangService: AccLangService,private wishlistService: AddToWishlistService,  private router: Router, private location : Location) {
    this.selectedLanguage = this.AccLangService.getLanguage().toUpperCase();
    this.wishlistCount$ = this.wishlistService.getWishlist().pipe(
      map(movies => movies.length)
    );
  }

  // ngOnInit(){
  //   let navbar = document.getElementById("navbar");
  //   let img_color = document.getElementById("img_color");
  //   let bars = document.getElementById("bars");
  //   if(window.scrollY >= 0 && window.scrollY < 100 && window.innerWidth <= 768 && navbar){
  //     navbar.classList.add("active");
  //   }else{
  //     navbar?.classList.remove("active");
  //   }

  //   window.addEventListener("resize" , ()=>{
  //     if(window.innerWidth < 769 && navbar){
  //       navbar.classList.add("active");
  //     }else{
  //       navbar?.classList.remove("active");
  //     }
  //   })

  //   window.onscroll = ()=>{
  //     console.log(window.scrollY > 50);
  //     if(window.scrollY > 50){
  //       if(navbar && img_color && bars) {
  //         navbar.style.background = "white";
  //         navbar.classList.add("active");
  //         bars.classList.replace("text-white","text-dark");
  //         img_color.style.filter = "invert(100%)"
  //       }
  //     }else{
  //       if(navbar && img_color && bars) {

  //         if(window.innerWidth < 768){
  //           navbar.classList.add("active");
  //           navbar.style.background = "transparent";
  //           img_color.style.filter = "invert(0%)";
  //           bars.classList.replace("text-dark","text-white");

  //         }else{
  //           navbar.style.background = "transparent";
  //           navbar.classList.remove("active");
  //           img_color.style.filter = "invert(0%)";
  //           bars.classList.replace("text-dark","text-white");
  //         }


  //       }
  //     }
  //   }

  // }

  changeLanguage(lang: string) {
    this.AccLangService.setLanguage(lang);
    this.selectedLanguage = lang.toUpperCase();
    // window.location.reload();

    // const currentUrl = this.router.url;
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigateByUrl(currentUrl);
    // });

    // this.location.go(this.location.path());
    // window.location.reload();

  }

  handleClose(){
    let nav = document.getElementById("nav-header");
    console.log("closed");
    if (!nav) return;
    nav.style.right = nav.style.right === '-50%' ? '0%' : '-50%';
  }

  handleBars(){
    let nav = document.getElementById("nav-header");

    if (!nav) return;
    nav.style.right = nav.style.right === '50%' ? '0%' : '-50%';
  }

}
