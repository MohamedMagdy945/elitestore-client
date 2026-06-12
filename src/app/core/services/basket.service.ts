import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Basket } from '../models/basket/basket.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/api/v1';
  private basketUrl = this.baseUrl + '/basket';

  private basketCountSource = new BehaviorSubject<number>(0);
  basketCount$ = this.basketCountSource.asObservable();
  setBasketCount(count: number) {
    this.basketCountSource.next(count);
  }
  getBasketCount(): number {
    return this.basketCountSource.value;
  }

  createBasket(basket: Basket): Observable<any> {
    return this.http.post(`${this.basketUrl}/CreateBasket`, basket).pipe(
      tap((result: any) => {
        const count = result?.items?.reduce(
          (sum: number, item: any) => sum + item.quantity,
          0
        ) ?? 0;

        this.basketCountSource.next(count);
      })
    );
  }

  getBasket(email: string): Observable<Basket | null> {
    return this.http.get<Basket | null>(`${this.basketUrl}/GetBasket/${email}`);
  }

  loadBasketCount(email: string) {
    this.getBasket(email).subscribe({
      next: basket => {
        const count = basket?.items?.reduce(
          (sum, item) => sum + item.quantity,
          0
        ) ?? 0;

        this.basketCountSource.next(count);
      },
      error: () => {
        this.basketCountSource.next(0);
      }
    });
  }
}
