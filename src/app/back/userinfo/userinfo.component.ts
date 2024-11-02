import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Offer } from 'src/app/models/offer.model';
import { User } from 'src/app/models/user.model';
import { OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public user: User, public userService: UserService, private router: Router) {}

  removeUser() {
    this.userService.deleteUser(this.user.id).subscribe(data =>{
      console.log(data);
      this.router.navigate(['/back/user-list']);
      window.location.reload();
    },
    error => console.log(error));
  }
}
