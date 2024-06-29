import { inject } from '@angular/core';
import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

export const autenticacaoInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const tokenService = inject(TokenService);

  if (tokenService.possuiToken()) {
    const token = tokenService.retornarToken();
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  return next(req);
};
