import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8089/datascope/user';

  constructor(private http: HttpClient, private router: Router) { }

  signup(data:any){
    return this.http.post(this.apiUrl+"/signup", data,{
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    responseType: 'text' as 'json'
    });
  }

  login(data:any){
    return this.http.post(this.apiUrl+"/login", data,{
    headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  checkToken(){
    return this.http.get(this.apiUrl+"/checkToken");
  }

  isAuthenticated():boolean{
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

  getUserInfo(email: string): Observable<User> {
    const url = `${this.apiUrl}/retrieve-user/${email}`;
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<User>(url, { headers });
  }

  getUserEmailFromToken(){
    const token:any = localStorage.getItem('token');
    var tokenPayload: any;
    var email: any;
    try {
      tokenPayload = jwtDecode(token)
      email = tokenPayload.sub;
    } catch(err) {
    }
    return email;
  }

}
