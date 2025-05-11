import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const loadingService = inject(LoadingService);
  loadingService.show();

  return next(req).pipe(
    delay(2000), // ⏳ Retraso artificial de 2 segundos para simular una carga-eliminar
    finalize(() => loadingService.hide())
  );
};
