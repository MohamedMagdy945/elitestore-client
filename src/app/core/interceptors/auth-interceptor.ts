import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      
      if (error.status !== 401 || isRefreshing) {
        return throwError(() => error);
      }

      isRefreshing = true;

      return authService.refreshToken().pipe(
        switchMap((response) => {
          isRefreshing = false;

          const newAccessToken = response.data.accessToken;

          authService.setAccessToken(newAccessToken);

          return next(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            })
          );
        }),
        catchError((err) => {
          isRefreshing = false;
          authService.logout();
          return throwError(() => err);
        })
      );
    })
  );
};