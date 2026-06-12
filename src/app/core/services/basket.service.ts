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
export class BasketService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/api/v1';
  private basketUrl = this.baseUrl + '/basket';


}
