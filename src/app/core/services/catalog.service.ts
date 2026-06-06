import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { PaginatedResult } from '../models/paginated-result.model';
import { Product } from '../models/product/Product.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/api/v1';
  private productUrl = this.baseUrl + '/products';
  private router = inject(Router);

  getProducts(pageIndex: number, pageSize: number): Observable<PaginatedResult<Product>> {

    const params = new HttpParams()
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize);

    return this.http.get<PaginatedResult<Product>>(
      `${this.baseUrl}/GetAllProducts`,
      { params }
    );
  }

  // ✅ GET BY ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${this.baseUrl}/GetProductById/${id}`
    );
  }

  // ✅ CREATE PRODUCT
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${this.baseUrl}/CreateProduct`,
      product
    );
  }

  // ✅ UPDATE PRODUCT
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.baseUrl}/UpdateProduct/${id}`,
      product
    );
  }

  // ✅ DELETE PRODUCT
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/DeleteProduct/${id}`
    );
  }

}
