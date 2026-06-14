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

  private basketSource = new BehaviorSubject<Basket | null>(null);
  basket$ = this.basketSource.asObservable();

  setBasketCount(count: number) {
    this.basketCountSource.next(count);
  }
  getBasketCount(): number {
    return this.basketCountSource.value;
  }

  createBasket(basket: Basket): Observable<any> {
    return this.http.post(`${this.basketUrl}/CreateBasket`, basket).pipe(
      tap((result: any) => {
        const count = result?.items?.length ?? 0;

        this.basketCountSource.next(count);
      })
    );
  }
  getBasket(email: string): Observable<Basket | null> {
    return this.http
      .get<Basket | null>(`${this.basketUrl}/GetBasket/${email}`)
      .pipe(
        tap(basket => this.basketSource.next(basket))
      );
  }
   setBasket(basket: Basket | null) {
    this.basketSource.next(basket);
  }
  get basket(): Basket | null {
  return this.basketSource.value;
  }

  loadBasketCount(email: string) {
    this.getBasket(email).subscribe({
      next: basket => {
        const count = basket?.items?.length ?? 0;

        this.basketCountSource.next(count);
      },
      error: () => {
        this.basketCountSource.next(0);
      }
    });
  }
}
