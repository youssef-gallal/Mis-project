import { Routes } from '@angular/router';
import { MoviesListComponent } from './home-page/movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainPageComponent } from './home-page/main-page/main-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  {
    path: 'movies',
    component: MainPageComponent,
    title: 'Home Page'
  },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent,
    title: 'Movie Details'
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    title: 'Wishlist Page'
  },
  {
    path: 'search/:searchKey',
    component: MovieSearchComponent,
    title: 'Search'
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    title: 'Registration'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found'
  }

];

