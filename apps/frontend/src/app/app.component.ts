import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { TrackingService } from '@frontend/components';
import { FOOTER, IFooterBlock } from '@frontend/connector-interfaces';
import { take } from 'rxjs/operators';
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
    @Inject(PLATFORM_ID) readonly platformId: Object,
    @Inject(DOCUMENT) readonly document: Document,
    private readonly tracking: TrackingService,
    private readonly renderer: Renderer2,
    private readonly update: SwUpdate,
  ) {
    if (isPlatformBrowser(platformId)) {
      this.device.setDeviceWidth();
      this.tracking.buildHeadScript(this.renderer);
      this.tracking.buildBodyScript(this.renderer);
    }
    this.update.available.pipe(take(1)).subscribe(async () => {
      try {
        await update.activateUpdate();
        this.document.location.reload();
      } catch (err) {
        console.error('swUpdate error', err);
      }
    });
  }

  onResize(): void {
    this.device.setDeviceWidth();
  }
}
