import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ImportofferComponent } from '../importoffer/importoffer.component';
import { OfferinfoComponent } from '../offerinfo/offerinfo.component';
import { Offer } from 'src/app/models/offer.model';
import { OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-offerlist',
  templateUrl: './offerlist.component.html',
  styleUrls: ['./offerlist.component.css']
})
export class OfferlistComponent implements AfterViewInit {
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
        this.offers = data.filter(offer => offer.user && offer.user.id === userId);
        console.log(this.offers);
        this.dataSource.data = this.offers;
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

    // this.setupColumnSelection();
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

  setupColumnSelection() {
    const columns = ['type', 'enterprise', 'email', 'actions'];
  
    // Initially disable selection for all cells
    columns.forEach((column) => {
      const cells = document.querySelectorAll(`.${column}-cell`);
      console.log("the cells are: "+cells);
      cells.forEach((cell) => {
        (cell as HTMLElement).style.userSelect = 'none'; // Disable selection initially
      });
    });
  
    columns.forEach((column) => {
      const cells = document.querySelectorAll(`.${column}-cell`);
  
      cells.forEach((cell) => {
        const htmlCell = cell as HTMLElement;
        // Enable selection on the clicked column
        htmlCell.addEventListener('mousedown', (event: MouseEvent) => {
          console.log(`Mouse down on column: ${column}`); // Debugging line
          event.preventDefault(); // Prevent default selection behavior
          // Disable selection for all other columns
          columns.forEach((otherColumn) => {
            if (otherColumn !== column) {
              const otherCells = document.querySelectorAll(`.${otherColumn}-cell`);
              otherCells.forEach((otherCell) => {
                (otherCell as HTMLElement).style.userSelect = 'none'; // Disable selection
              });
            }
          });
  
          // Enable selection on the current column
          cells.forEach((selectedCell) => {
            (selectedCell as HTMLElement).style.userSelect = 'text'; // Enable selection
          });
        });
  
        // Reset selection when the mouse is released
        htmlCell.addEventListener('mouseup', () => {
          // Reset all selections
          columns.forEach((otherColumn) => {
            const otherCells = document.querySelectorAll(`.${otherColumn}-cell`);
            otherCells.forEach((otherCell) => {
              (otherCell as HTMLElement).style.userSelect = 'none'; // Disable selection
            });
          });
        });
      });
    });
  }
  

  openDialogImport() {
    this.dialog.open(ImportofferComponent);
  }

  openDialogInfo() {
    this.dialog.open(OfferinfoComponent);
  }
}
