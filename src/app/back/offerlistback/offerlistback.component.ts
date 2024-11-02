import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ImportofferComponent } from 'src/app/front/importoffer/importoffer.component';
import { OfferinfoComponent } from 'src/app/front/offerinfo/offerinfo.component'; 
import { Offer } from 'src/app/models/offer.model';
import { OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-offerlistback',
  templateUrl: './offerlistback.component.html',
  styleUrls: ['./offerlistback.component.css']
})
export class OfferlistbackComponent {
  offers: Offer[] = [];
  displayedcolumns: string[] = ['type', 'enterprise', 'email', 'actions'];
  dataSource: MatTableDataSource<Offer> = new MatTableDataSource();
  userEmail: any;
  user: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private offerService: OfferService, private userService: UserService) {
    this.userEmail = userService.getUserEmailFromToken();
    this.userService.getUserInfo(this.userEmail).subscribe(user => {
      const userId = user.id;
      console.log(userId);
      this.offerService.getOffers().subscribe(data => {
        // Filter offers based on user ID
        // this.offers = data.filter(offer => offer.user && offer.user.id === userId);
        // console.log(this.offers);
        this.dataSource.data = data;
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

  viewMore(offer: Offer) {
    console.log('Viewing more details for:', offer);
    this.dialog.open(OfferinfoComponent, {
      data: offer
    });
  }

  openDialogImport() {
    this.dialog.open(ImportofferComponent);
  }

  openDialogInfo() {
    this.dialog.open(OfferinfoComponent);
  }
}
