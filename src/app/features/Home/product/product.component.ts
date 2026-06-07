import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product/Product.model';
import { CatalogService } from '../../../core/services/catalog.service';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {

  private readonly catelogService = inject(CatalogService);
  productList = signal<Product[]>([])
  private pageIndex = 1;
  private pageSize = 20;
  ngOnInit(): void {
    this.getProductsData();
  }
  
 getProductsData():void{
    this.catelogService.getProducts(this.pageIndex, this.pageSize).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.productList.set(res.data);
      },
      error:(err)=>{
        console.log(err)
      },
        })
  }

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
