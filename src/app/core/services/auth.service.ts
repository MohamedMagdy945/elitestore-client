import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterRequest } from '../models/register-request.model';
import { ApiResponse } from '../models/api-response.model';
import { AuthResponse } from '../models/auth-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'api/v1/auth';

   register(request: RegisterRequest) {
    return this.http.post<ApiResponse<AuthResponse>>(
      `${this.baseUrl}/register`,
      request
    );
  }

}
