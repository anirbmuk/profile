import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../shared/services';
import { IHomePageData } from './home.type';

@Injectable({
  providedIn: 'root',
})
export class HomePageResolver implements Resolve<IHomePageData | null> {
  constructor(private readonly data: DataService) {}

  resolve(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot,
  ): Observable<IHomePageData | null> | null {
    return this.data.bio$.pipe(
      map(([profile, career]) => ({
        profile,
        career,
      })),
    );
  }
}
