import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../../../core/services/catalog.service';
import { Product } from '../../../core/models/product/Product.model';
import { environment } from '../../../../environments/environment';
import { BasketService } from '../../../core/services/basket.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { BasketItem } from '../../../core/models/basket/BasketItem.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly activateRoute = inject(ActivatedRoute);
  private readonly catalogService = inject(CatalogService);
  private readonly basketService = inject(BasketService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);


  private readonly toastService = inject(ToastService);

  productDetails = signal<Product>({} as Product)
  readonly baseUrl = environment.apiUrl;

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.getProductDetails(id);
      }
    });
  }
  getProductDetails(id: string): void {
    this.catalogService.getProductById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.productDetails.set(res)
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
  addToCart(product: Product): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const email = this.authService.getCurrentUser()?.email;

    if (!email) {
      this.router.navigate(['/login']);
      return;
    }

    this.basketService.getBasket(email).subscribe({

      next: (basket) => {
        this.toastService.show('prodcut added successfully')
        if (!basket) {
          basket = {
            email: email,
            items: [],
            totalPrice: 0
          };
        }
        console.log(basket);

        const existingItem = basket.items.find(
          (x: BasketItem) => x.productId === product.id
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          basket.items.push({
            productId: product.id,
            productName: product.name,
            price: product.price,
            imageFile: product.imageUrls[0],
            quantity: 1
          });
        }

        // IMPORTANT: send full basket
        this.basketService.createBasket(basket).subscribe({
          next: () => {
            console.log('Basket updated');

          },
          error: err => {
            console.error(err);
          }
        });

      },
      error: err => {
        console.error(err);
      }
    });
  }



}
