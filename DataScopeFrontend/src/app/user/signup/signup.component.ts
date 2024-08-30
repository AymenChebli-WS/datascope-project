import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  responseMessage: any;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private snackbarService: SnackbarService) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      birthDate: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  onSubmit() {
    var formData = this.signupForm.value;
    var data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      birthDate: formData.birthDate,
      phoneNumber: formData.phoneNumber
    }

    this.userService.signup(data).subscribe((Response:any) => {
      this.responseMessage = "User has been registered successfully!";
      this.snackbarService.openSnackBar(this.responseMessage, "");
      this.router.navigate(['/login'])
    })
  }
}
