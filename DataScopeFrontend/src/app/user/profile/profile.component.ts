import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportofferComponent } from 'src/app/front/importoffer/importoffer.component';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userEmail: any;
  user: any;
  
  constructor(private userService: UserService, public dialog: MatDialog) {
    this.userEmail = userService.getUserEmailFromToken();
    this.userService.getUserInfo(this.userEmail).subscribe(
      (data: User) => {
        this.user = data;
        console.log('User data retrieved:', this.user);
      },
      (error) => {
        console.error('Error retrieving user:', error);
      }
      );
    }

    openDialogImport() {
      this.dialog.open(ImportofferComponent); 
    }
  }
