import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './user/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './user/login/login.component';
import { HomepageComponent } from './front/homepage/homepage.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ProfileComponent } from './user/profile/profile.component';
import { NavbarComponent } from './front/navbar/navbar.component';
import { SidebarComponent } from './front/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { OfferlistComponent } from './front/offerlist/offerlist.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ImportofferComponent } from './front/importoffer/importoffer.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { OfferinfoComponent } from './front/offerinfo/offerinfo.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import { OfferlistbackComponent } from './back/offerlistback/offerlistback.component';
import { UserlistComponent } from './back/userlist/userlist.component';
import { UserinfoComponent } from './back/userinfo/userinfo.component';
import { SidebarbackComponent } from './back/sidebarback/sidebarback.component';
import { NavbarbackComponent } from './back/navbarback/navbarback.component';
import { StatisticsComponent } from './front/statistics/statistics.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { StatsbackComponent } from './back/statsback/statsback.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomepageComponent,
    ProfileComponent,
    NavbarComponent,
    SidebarComponent,
    OfferlistComponent,
    ImportofferComponent,
    OfferinfoComponent,
    OfferlistbackComponent,
    UserlistComponent,
    UserinfoComponent,
    SidebarbackComponent,
    NavbarbackComponent,
    StatisticsComponent,
    StatsbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
