import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private showUpdateNotification = new BehaviorSubject<boolean>(true);
  private showUpdateNotification$ = this.showUpdateNotification.asObservable();

  constructor(
    private readonly update: SwUpdate,
    @Inject(DOCUMENT) readonly document: Document,
  ) {}

  readonly updateAvailable$ = combineLatest([
    this.showUpdateNotification$,
    this.update.available.pipe(take(1)),
  ]).pipe(map(([show, update]) => (show ? update : null)));

  async reload() {
    try {
      await this.update.activateUpdate();
      this.document.location.reload();
    } catch (err) {
      console.error('swUpdate error', err);
    }
  }

  hideNotification() {
    this.showUpdateNotification.next(false);
  }
}
