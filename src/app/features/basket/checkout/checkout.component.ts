import { Component, inject, signal } from '@angular/core';
import { BasketService } from '../../../core/services/basket.service';
import { environment } from '../../../../environments/environment';
import { Basket } from '../../../core/models/basket/basket.model';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CheckoutRequest } from '../../../core/models/basket/checkout-request.model';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  placeOrder() {
    throw new Error('Method not implemented.');
  }
  private readonly basketService = inject(BasketService);
  private readonly authService = inject(AuthService);

  readonly baseUrl = environment.apiUrl;
  basket = signal<Basket | null>(null);

  model: CheckoutRequest = {
    userName: '',
    totalPrice: 0,

    firstName: '',
    lastName: '',
    email: '',

    address: '',
    addressLine: '',
    country: '',
    city: '',
    zipCode: '',

    cardName: '',
    cardNumber: '',
    expiration: '',
    cvv: '',

    paymentMethod: 0
  }; private email = this.authService.getCurrentUser()?.email!;

  ngOnInit(): void {
    console.log(this.email)
    this.basketService.getBasket(this.email).subscribe(basket => {
      this.basket.set(basket);
    });
    this.model.paymentMethod = 0;
    console.log(this.basket)
  }
}
