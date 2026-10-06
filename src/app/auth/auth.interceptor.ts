import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { API_URL } from '../api.config';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();
  const ehNossa = req.url.startsWith(API_URL);

  const requisicao = token && ehNossa
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(requisicao).pipe(
    catchError((erro: HttpErrorResponse) => {
      const ehLogin = req.url.endsWith('/auth/login');
      if (erro.status === 401 && !ehLogin) {
        auth.logout();
      }
      return throwError(() => erro);
    })
  );
};
