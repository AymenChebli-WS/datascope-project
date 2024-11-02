import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer.model';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = 'http://127.0.0.1:8089/datascope/offer';

  constructor(private http: HttpClient, public userService: UserService) { }

  generateData(textData: string): Observable<any> {
    // Get Connected User
    const userEmail = this.userService.getUserEmailFromToken();
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    return new Observable((observer) => {
        this.userService.getUserInfo(userEmail).subscribe(
            (data: User) => {
                const userId = data.id;
                console.log('User data retrieved:', data);

                this.http.post<any>(`${this.apiUrl}/add-offer`, { textData, userId }, { headers })
                    .subscribe(
                        (response) => {
                            observer.next(response);
                            observer.complete();
                        },
                        (error) => {
                            observer.error(error);
                        }
                    );
            },
            (error) => {
                console.error('Error retrieving user:', error);
                observer.error(error);
            }
        );
    });
}

  getOffers(): Observable<Offer[]> {
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Offer[]>(`${this.apiUrl}/retrieve-all-offers`, { headers });
  }

  deleteOffer(offerId: number): Observable<void> {
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<void>(`${this.apiUrl}/delete-offer/${offerId}`, { headers });
  }

}
