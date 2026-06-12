import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Basket } from '../models/basket/basket.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/api/v1';
  private basketUrl = this.baseUrl + '/basket';

  createBasket(basket: Basket): Observable<any> {
    return this.http.post(`${this.basketUrl}/CreateBasket`, basket);
  }


  getBasket(email: string): Observable<any> {
    return this.http.get(`${this.basketUrl}/GetBasket/${email}`);
  }
}
