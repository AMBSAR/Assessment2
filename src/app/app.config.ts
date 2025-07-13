import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { loggingInterceptorFunctional, TimeoutInterceptor } from './functional.interceptor';
import {provideAnimations} from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
              provideHttpClient(withInterceptors([loggingInterceptorFunctional]),
              withInterceptorsFromDi() ),
              provideAnimations(),
              { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }, provideAnimationsAsync('noop'),
            ]
};

