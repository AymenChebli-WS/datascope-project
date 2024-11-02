import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportofferComponent } from 'src/app/front/importoffer/importoffer.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(public dialog: MatDialog) {}

  openDialogImport() {
    this.dialog.open(ImportofferComponent); 
  }
}
