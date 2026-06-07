import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product/Product.model';
import { CatalogService } from '../../../core/services/catalog.service';

@Component({
  selector: 'app-product',
  imports: [RouterLink],
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
        this.productList.set(res.data);
      },
      error:(err)=>{
        console.log(err)
      },
        })
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
   addToCart(id:string):void{
    console.log(id);
   if(localStorage.getItem('AccessToken')){
    //  this.cartService.addProductToCart(id).subscribe({
    //   next:(res)=>{
    //     this.cartService.cartCount.set(res.numOfCartItems)
    //     this.toastrService.success(res.message , 'FreshCart' , {progressBar:true , closeButton:true})
    //   },
    // })
   }else{
      // this.toastrService.warning("Login first" , 'FreshCart' , {progressBar:true , closeButton:true})
   }
  }
}
