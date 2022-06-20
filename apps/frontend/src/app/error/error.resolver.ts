import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { IError } from '.';
import { ErrorService } from '../shared/services';

@Injectable({
  providedIn: 'root',
})
export class ErrorResolver implements Resolve<IError | null> {
  constructor(
    private readonly errorService: ErrorService,
    private readonly router: Router,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.errorService.error$.pipe(
      take(1),
      tap((data) => {
        if (!data) {
          throw new Error('No error');
        }
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(null);
      }),
    );
  }
}
