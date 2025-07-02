import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { catchError, Observable, tap, throwError, empty, TimeoutError, timeout } from 'rxjs';
//import { timeout, catchError } from 'rxjs/operators';
export const functionalInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

export const loggingInterceptorFunctional: HttpInterceptorFn = (req, next) => {
  console.log('Request URL: ' + req.url);
  // return next(req).pipe(
  //   catchError((error: HttpErrorResponse) => {
  //     console.error('Logging Interceptor Functional Error:', error);
  //     return throwError(()=> error);
  //   })
  // );
  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      console.log(req.url, 'returned a response with status', event.status);
    }
  }));
}

const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
const defaultTimeout = 5000;

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  //constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //const timeoutDuration = Number(req.headers.get('timeout')) || this.defaultTimeout;
    const timeoutDuration = 10000; // Example: 10 seconds

    return next.handle(req).pipe(
          timeout(timeoutDuration),
          catchError((error) => {
            if (error.name === 'TimeoutError') {
              // Handle timeout-specific error (e.g., display a message)
              console.error('Request timed out:', req.url);
              // Optionally re-throw the error or return a specific observable
              return throwError(() => new Error('Request Timeout'));
            }
            // Re-throw other errors
            return throwError(() => error);
    }));
  }
}
