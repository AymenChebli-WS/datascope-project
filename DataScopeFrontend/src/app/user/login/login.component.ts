import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  responseMessage: any;
  user: any;
  userEmail: any;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private snackbarService: SnackbarService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password,
    }
    this.userService.login(data).subscribe((response: any) => {
      localStorage.setItem('token', response.token);

      // Check if user is Admin
      this.userEmail = this.userService.getUserEmailFromToken();
      this.userService.getUserInfo(this.userEmail).subscribe(
        (data: User) => {
          this.user = data;
          if(this.user.role == "ADMIN") {
            this.router.navigate(['/back/user-list']);
          } else {
            this.router.navigate(['/offer-list']);
          }
          console.log('User data retrieved:', this.user);
        },
        (error) => {
          console.error('Error retrieving user:', error);
        }
        );
      
    }, (error) => {
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = "Login failed."
      }
      this.snackbarService.openSnackBar(this.responseMessage, '')
    })
  }
}
