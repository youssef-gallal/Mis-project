import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor() { }
  getUsername() {
    return localStorage.getItem('userName');
  }
}
