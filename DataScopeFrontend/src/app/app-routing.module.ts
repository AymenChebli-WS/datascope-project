import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './user/signup/signup.component';
import { LoginComponent } from './user/login/login.component';
import { HomepageComponent } from './front/homepage/homepage.component';
import { ProfileComponent } from './user/profile/profile.component';
import { OfferlistComponent } from './front/offerlist/offerlist.component';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "offer-list", component: OfferlistComponent, canActivate: [AuthGuard] },
  { path: "", component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
