import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { PaginationParams } from '../models/PaginationParams';
import { PaginatedResponse } from '../models/paginated-response.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiUrl + '/api/users';
  private readonly http = inject(HttpClient);

  GetUsersList(params: PaginationParams) {
    return this.http.get<ApiResponse<PaginatedResponse<User>>>(
      `${this.baseUrl}/get-all-users`,
      {
        params: {
          pageNumber: params.pageNumber,
          pageSize: params.pageSize
        }
      }
    );
  }
}

