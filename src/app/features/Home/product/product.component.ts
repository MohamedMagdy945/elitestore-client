import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product/Product.model';

@Component({
  selector: 'app-products.component',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {

    productList = signal<Product[]>([])

wishlistIds() {
throw new Error('Method not implemented.');
}
addToWishlist(arg0: any) {
throw new Error('Method not implemented.');
}
addToCart(arg0: any) {
throw new Error('Method not implemented.');
}
}
