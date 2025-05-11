import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([loadingInterceptor])
    ),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
    provideHttpClient(withInterceptorsFromDi())
  ]
};
