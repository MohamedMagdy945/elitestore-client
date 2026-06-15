import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { PaginatedResult } from '../models/paginated-result.model';
import { Product } from '../models/product/Product.model';
import { Category } from '../models/product/Category.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/api/v1';
  private productUrl = this.baseUrl + '/products';
  private categoryUrl = this.baseUrl + '/categories';
  private router = inject(Router);

  getProducts(pageIndex: number, pageSize: number): Observable<PaginatedResult<Product>> {

    const params = new HttpParams()
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize);

    return this.http.get<PaginatedResult<Product>>(
      `${this.productUrl}/GetAllProducts`,
      { params }
    );
  }

  getCategories() {
    return this.http.get<Category[]>(`${this.categoryUrl}/GetAllCategories`);
  }

  // ✅ GET BY ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(
      `${this.productUrl}/GetProductById/${id}`
    );
  }

  // ✅ CREATE PRODUCT
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${this.productUrl}/CreateProduct`,
      product
    );
  }

  // ✅ UPDATE PRODUCT
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.productUrl}/UpdateProduct/${id}`,
      product
    );
  }

  // ✅ DELETE PRODUCT
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.productUrl}/DeleteProduct/${id}`
    );
  }

}
