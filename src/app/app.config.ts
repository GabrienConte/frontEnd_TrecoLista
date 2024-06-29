import { ApplicationConfig, ValueProvider } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig} from '@angular/material/snack-bar';
import { autenticacaoInterceptor } from './core/interceptors/autenticacao.interceptor';
import { TokenService } from './core/services/token.service';

const SNACK_BAR_CONFIG: ValueProvider = {
  provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: 'snackBarPosition'
  } as MatSnackBarConfig
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideHttpClient(),
    SNACK_BAR_CONFIG,
    provideHttpClient(withInterceptors([autenticacaoInterceptor])),
    TokenService 
  ],
};
