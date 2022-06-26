import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, shareReplay, startWith } from 'rxjs/operators';

export const SMALL_FORM_FACTOR = 'SFF';
export const LARGE_FORM_FACTOR = 'LFF';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private deviceWidth?: string;
  private deviceSizeChanged = new Subject<string>();

  private _orientation: 'portrait' | 'landscape' | undefined;

  readonly device$ = this.deviceSizeChanged
    .asObservable()
    .pipe(
      startWith(this.getDeviceSize()),
      distinctUntilChanged(),
      shareReplay(1),
    );

  getDeviceSize(): string {
    return this.deviceWidth || 'xs';
  }

  isSFF(): boolean {
    return ['xs', 'sm', 'md'].includes(this.getDeviceSize());
  }

  get orientation(): 'portrait' | 'landscape' | undefined {
    return this._orientation;
  }

  getFormFactor() {
    return this.isSFF() ? SMALL_FORM_FACTOR : LARGE_FORM_FACTOR;
  }

  setDeviceWidth(): void {
    const deviceWidth = window.innerWidth;
    const deviceHeight = window.innerHeight;
    let size: string;
    if (deviceWidth < 640) {
      size = 'xs';
    } else if (deviceWidth >= 640 && deviceWidth < 768) {
      size = 'sm';
    } else if (deviceWidth >= 768 && deviceWidth < 1024) {
      size = 'md';
    } else if (deviceWidth >= 1024 && deviceWidth < 1280) {
      size = 'lg';
    } else {
      size = 'xl';
    }
    this.setDeviceSize(size);
    this.setOrientation(deviceWidth > deviceHeight ? 'landscape' : 'portrait');
    this.deviceSizeChanged.next(size);
  }

  private setDeviceSize(deviceSize: string): void {
    this.deviceWidth = deviceSize;
  }

  private setOrientation(orientation: 'portrait' | 'landscape'): void {
    this._orientation = orientation;
  }
}
