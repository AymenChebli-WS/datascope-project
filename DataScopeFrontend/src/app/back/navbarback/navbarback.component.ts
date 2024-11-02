import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbarback',
  templateUrl: './navbarback.component.html',
  styleUrls: ['./navbarback.component.css']
})
export class NavbarbackComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

  logout() {
    // Remove token from local storage
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    // Navigate to the home page
    this.router.navigate(['/']);
  }
}
