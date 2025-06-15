import { Component } from '@angular/core';
import { HeroSectionComponent } from "../hero-section/hero-section.component";
import { MoviesListComponent } from "../movies-list/movies-list.component";

@Component({
  selector: 'app-main-page',
  imports: [HeroSectionComponent, MoviesListComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
