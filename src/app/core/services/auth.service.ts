import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterRequest } from '../models/auth/register-request.model';
import { ApiResponse } from '../models/api-response.model';
import { AuthResponse } from '../models/auth/auth-response.model';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/auth/login-request.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/api/v1/auth';
  private router = inject(Router); 

  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }
  setAccessToken(token: string): void {
    if (token) {
      localStorage.setItem('accessToken', token);
    }
  }

  register(request: RegisterRequest) {
    console.log(this.baseUrl);
    return this.http.post<ApiResponse<AuthResponse>>(
      `${this.baseUrl}/register`,
      request,
        { withCredentials: true }
    );
  }

  login(request: LoginRequest) {
    console.log(this.baseUrl);
    return this.http.post<ApiResponse<AuthResponse>>(
      `${this.baseUrl}/login`,
      request,
      { withCredentials: true }
    );
  }

  refreshToken(): Observable<ApiResponse<AuthResponse>> {

    return this.http.post<ApiResponse<AuthResponse>>(
      `${this.baseUrl}/refresh-token`,
      {},
      { withCredentials: true }
    ).pipe(
      tap((response: ApiResponse<AuthResponse>) => {
        localStorage.setItem('accessToken', response.data.accessToken);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');

    this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        console.log('Backend logout success');
      },
      error: (err) => {
        console.error('Backend logout failed', err);
      }
    });

    this.router.navigate(['/login']);
}
isLoggedIn(): boolean {
  const token = this.getAccessToken();
  if (!token) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
getCurrentUser() {
  const token = this.getAccessToken();

  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));

  return payload;
}
}
