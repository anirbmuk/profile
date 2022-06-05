import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { FOOTER, IFooterBlock } from '@frontend/connector-interfaces';
import { DeviceService, RequestService } from './shared/services';

@Component({
  selector: 'fe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly footer$ = this.request.get<[IFooterBlock]>(FOOTER);

  constructor(
    private readonly request: RequestService,
    private readonly device: DeviceService,
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) readonly platformId: Object
  ) {
    if (isPlatformBrowser(platformId)) {
      this.device.setDeviceWidth();
    }
  }

  onResize(): void {
    this.device.setDeviceWidth();
  }
}
