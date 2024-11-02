import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Offer } from 'src/app/models/offer.model';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offerinfo',
  templateUrl: './offerinfo.component.html',
  styleUrls: ['./offerinfo.component.css']
})
export class OfferinfoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public offer: Offer, public offerService: OfferService, private router: Router) {}

  removeOffer() {
    this.offerService.deleteOffer(this.offer.id).subscribe(data =>{
      console.log(data);
      this.router.navigate(['/offer-list']);
      window.location.reload();
    },
    error => console.log(error));
  }
}
