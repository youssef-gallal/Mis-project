import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestService {

  constructor(private http: HttpClient) { }
  createuser(model: any) {
    return this.http.post('http://localhost:3000/Register', model)
  }
  // getuser() {
  //   return this.http.get('http://localhost:3000/Register')
  // }
  getregister(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/Register');
  }
  getlogin(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/login');
  }

  createlogin(model: any) {
    return this.http.post('http://localhost:3000/login', model)
  }
}
