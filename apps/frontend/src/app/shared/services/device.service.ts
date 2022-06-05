import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';

export const SMALL_FORM_FACTOR = 'SFF';
export const LARGE_FORM_FACTOR = 'LFF';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private deviceSize?: string;
  private deviceSizeChanged = new Subject<string>();

  readonly device$ = this.deviceSizeChanged
    .asObservable()
    .pipe(startWith(this.getDeviceSize()), distinctUntilChanged());

  getDeviceSize(): string {
    return this.deviceSize || 'md';
  }

  isSFF(): boolean {
    return ['xs', 'sm'].includes(this.getDeviceSize());
  }

  getFormFactor() {
    return this.isSFF() ? SMALL_FORM_FACTOR : LARGE_FORM_FACTOR;
  }

  setDeviceWidth(): void {
    const deviceSize = window.innerWidth;
    let size: string;
    if (deviceSize < 640) {
      size = 'xs';
    } else if (deviceSize >= 640 && deviceSize < 768) {
      size = 'sm';
    } else if (deviceSize >= 768 && deviceSize < 1024) {
      size = 'md';
    } else if (deviceSize >= 1024 && deviceSize < 1280) {
      size = 'lg';
    } else {
      size = 'xl';
    }
    this.setDeviceSize(size);
    this.deviceSizeChanged.next(size);
  }

  private setDeviceSize(deviceSize: string): void {
    this.deviceSize = deviceSize;
  }
}
