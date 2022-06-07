import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly errorService: ErrorService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error) => {
        const { code, message } = error.error;
        this.errorService.addError({
          code:
            code || error instanceof HttpErrorResponse
              ? (error as HttpErrorResponse)?.status || 500
              : 500,
          message:
            message ||
            error?.statusText ||
            'The cause of the error is unknown. Please contact your administrator',
          url:
            error instanceof HttpErrorResponse
              ? (error as HttpErrorResponse)?.url
              : '',
        });
        this.router.navigate(['/error'], { skipLocationChange: true });
        return EMPTY;
      })
    );
  }
}
