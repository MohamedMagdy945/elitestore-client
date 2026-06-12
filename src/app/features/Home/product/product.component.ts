import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product/Product.model';
import { CatalogService } from '../../../core/services/catalog.service';
import { environment } from '../../../../environments/environment';
import { DecimalPipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { BasketService } from '../../../core/services/basket.service';
import { BasketItem } from '../../../core/models/basket/BasketItem.model';

@Component({
  selector: 'app-product',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {

  private readonly catelogService = inject(CatalogService);
  private readonly router = inject(Router);
  private readonly basketService = inject(BasketService);
  private readonly authService = inject(AuthService);
  productList = signal<Product[]>([])
  private pageIndex = 1;
  private pageSize = 20;
  readonly baseUrl = environment.apiUrl;

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(): void {
    this.catelogService.getProducts(this.pageIndex, this.pageSize).subscribe({
      next: (res) => {
        this.productList.set(res.data);
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
        console.log(basket);
        if (!basket) {
          basket = {
            email: email,
            items: []
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
  addToWishlist(id: string): void {
    // const isInWishlist = this.wishlistIds().includes(id);

    // if (isInWishlist) {
    //   this.wishlistService.removeProductFromWishlist(id).subscribe({
    //     next: (res: any) => {
    //       this.wishlistService.wishlistIds.set([...res.data]);
    //       this.wishlistService.wishCount.set(res.data.length);
    //     },
    //   });
    // } else {
    //   this.wishlistService.addProuctToWishlist(id).subscribe({
    //     next: (res: any) => {
    //       this.wishlistService.wishlistIds.set([...res.data]);
    //       this.wishlistService.wishCount.set(res.data.length);
    //     },
    //   });
    // }
  }
}

