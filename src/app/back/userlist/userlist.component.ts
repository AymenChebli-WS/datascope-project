import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ImportofferComponent } from 'src/app/front/importoffer/importoffer.component';
import { OfferinfoComponent } from 'src/app/front/offerinfo/offerinfo.component'; 
import { Offer } from 'src/app/models/offer.model';
import { User } from 'src/app/models/user.model';
import { OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';
import { UserinfoComponent } from '../userinfo/userinfo.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
  users: User[] = [];
  displayedcolumns: string[] = ['role', 'full_name', 'email', 'phone','actions'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  userEmail: any;
  user: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private offerService: OfferService, private userService: UserService) {
    this.userEmail = userService.getUserEmailFromToken();
    this.userService.getUserInfo(this.userEmail).subscribe(user => {
      const userId = user.id;
      console.log(userId);
      this.userService.getUsers().subscribe(data => {
        // Filter offers based on user ID
        this.users = data.filter(user => user.role && user.role === "USER");
        console.log(data);
        this.dataSource.data = this.users;
        console.log(this.dataSource.data);
      }, error => {
        console.error('Error fetching offers', error);
      });
    }, error => {
      console.error('Error fetching user info', error);
    });
  }

  ngAfterViewInit() {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewMore(user: User) {
    console.log('Viewing more details for:', user);
    this.dialog.open(UserinfoComponent, {
      data: user
    });
  }

  openDialogImport() {
    this.dialog.open(ImportofferComponent);
  }

  openDialogInfo() {
    this.dialog.open(UserinfoComponent);
  }
}
