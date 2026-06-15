import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../../../core/services/catalog.service';
import { Product } from '../../../core/models/product/Product.model';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly activateRoute = inject(ActivatedRoute);
  private readonly catalogService = inject(CatalogService);
  productDetails = signal<Product>({} as Product)

 ngOnInit(): void {
  this.activateRoute.paramMap.subscribe(params => {
    const id = params.get('id');

    if (id) {
      this.getProductDetails(id);
    }
  });
}
 getProductDetails(id: string):void {
  this.catalogService.getProductById(id).subscribe({
     next:(res)=>{
        console.log(res);
        this.productDetails.set(res)
      },
      error:(err)=>{
        console.log(err)
      },
  })
 }



}
