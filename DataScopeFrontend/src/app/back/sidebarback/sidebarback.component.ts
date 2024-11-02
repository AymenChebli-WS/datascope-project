import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportofferComponent } from 'src/app/front/importoffer/importoffer.component';

@Component({
  selector: 'app-sidebarback',
  templateUrl: './sidebarback.component.html',
  styleUrls: ['./sidebarback.component.css']
})
export class SidebarbackComponent {
  constructor(public dialog: MatDialog) {}

  openDialogImport() {
    this.dialog.open(ImportofferComponent); 
  }
}
