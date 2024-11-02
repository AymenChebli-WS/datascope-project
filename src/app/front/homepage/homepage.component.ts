import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(private router: Router, private userService: UserService) {
    this.userService.checkToken().subscribe((response: any) => {
      this.router.navigate(['/offer-list']);
    }, (error:any) => {
      console.log(error);
    })
  }

}
