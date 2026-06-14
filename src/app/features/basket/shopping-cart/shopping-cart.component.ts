import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { BasketService } from '../../../core/services/basket.service';
import { Basket } from '../../../core/models/basket/basket.model';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  imports: [RouterLink],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
update(arg0: string,arg1: number) {
throw new Error('Method not implemented.');
}


  private readonly basketService = inject(BasketService);

  private readonly authService = inject(AuthService);

  private readonly id = inject(PLATFORM_ID);


  private email = this.authService.getCurrentUser()?.email!;
  basket = signal<Basket | null>(null);

  ngOnInit(): void {
    this.basketService.getBasket(this.email).subscribe(basket => {
      this.basket.set(basket);
    });
  }
 

  removeItem(arg0: any) {
    throw new Error('Method not implemented.');
  }

  cartDetails() {
    throw new Error('Method not implemented.');
  }

  clearAll() {
    throw new Error('Method not implemented.');
  }

}