import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BasketService } from '../../core/services/basket.service';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private authService = inject(AuthService);
  private basketService = inject(BasketService);
  cartCount$ = this.basketService.basketCount$;

  emailU: any = this.authService.getCurrentUser()?.email;
  nameU: any = this.authService.getCurrentUser()?.name;
  isOpen: boolean = false; 
  test: boolean = false;
  count() {
    return 1;
  }
  logged() : boolean {
    return this.authService.isLoggedIn();
  }
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
  logOut() {
  }


  ngOnInit(): void {
  }
}
