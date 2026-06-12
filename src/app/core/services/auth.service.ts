import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterRequest } from '../models/auth/register-request.model';
import { ApiResponse } from '../models/api-response.model';
import { AuthResponse } from '../models/auth/auth-response.model';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/auth/login-request.model';
import { User } from '../models/user/user.model';
import { CurrentUser } from '../models/user/currentuser.model';
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
      localStorage.setItem('token', token);
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
        localStorage.setItem('token', response.data.accessToken);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');

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

    if (!token) return false;

    return true;
  }
  getCurrentUser(): CurrentUser | null {
    const token = this.getAccessToken();

    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));

      return {
        id: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ?? '',
        name: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ?? '',
        email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ?? ''
      };

    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
}
function jwtDecode(token: string): any {
  throw new Error('Function not implemented.');
}

