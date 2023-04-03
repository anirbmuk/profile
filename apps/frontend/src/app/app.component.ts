import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { TrackingService } from '@frontend/components';
import { FOOTER, IFooterBlock } from '@frontend/connector-interfaces';
import { map } from 'rxjs/operators';
import {
  DeviceService,
  RequestService,
  UpdateService
} from './shared/services';

@Component({
  selector: 'fe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly footer$ = this.request
    .get<[IFooterBlock]>(FOOTER)
    .pipe(map((data) => data?.[0]));

  constructor(
    private readonly request: RequestService,
    private readonly device: DeviceService,
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) readonly platformId: Object,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly tracking: TrackingService,
    private readonly renderer: Renderer2,
    readonly update: UpdateService,
  ) {
    if (isPlatformBrowser(platformId)) {
      this.device.setDeviceWidth();
      this.tracking.buildHeadScript(this.renderer);
      this.tracking.buildBodyScript(this.renderer);
    }
  }

  onResize(): void {
    this.device.setDeviceWidth();
  }
}
