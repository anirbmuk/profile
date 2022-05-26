import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loading.asObservable();

  toggle(status: boolean) {
    this.loading.next(status);
  }
}
