import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  userEmail: any;
  user: any;

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this.checkIfAdmin();
  }
  
  async checkIfAdmin(): Promise<boolean> {
    try {
      const userEmail = this.userService.getUserEmailFromToken();
      const user = await this.userService.getUserInfo(userEmail).toPromise();
      if (user && user.role === 'ADMIN') {
        return true;
      } else {
        this.router.navigate(['/']); // Redirect to home if not admin
        return false;
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      this.router.navigate(['/']); // Redirect in case of error
      return false;
    }
  }
}