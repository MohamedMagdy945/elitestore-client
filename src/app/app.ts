import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { BasketService } from './core/services/basket.service';
import { AuthService } from './core/services/auth.service';
import { ToastSuccessComponent } from './shared/components/toast-success/toast-success.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule, ToastSuccessComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('elitestore-client');
  private readonly basketService = inject(BasketService);
  private readonly authService = inject(AuthService);
 
  ngOnInit() {
  if (this.authService.isLoggedIn()) {
    const user = this.authService.getCurrentUser();

    if (user) {
      this.basketService.loadBasketCount(user.email);
    }
  }
}
}
