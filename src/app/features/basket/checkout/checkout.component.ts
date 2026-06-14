import { Component, inject, signal } from '@angular/core';
import { BasketService } from '../../../core/services/basket.service';
import { environment } from '../../../../environments/environment';
import { Basket } from '../../../core/models/basket/basket.model';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  private readonly basketService = inject(BasketService);
    readonly baseUrl = environment.apiUrl;
    basket = signal<Basket | null>(null);
  ngOnInit(): void {
      this.basketService.getBasket(this.email).subscribe(basket => {
        this.basket.set(basket);
      });
    }
}
