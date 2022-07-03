import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SanitizerService, TrackingService } from '@frontend/components';
import { IBlog, IProfile, ISocial } from '@frontend/connector-interfaces';
import { map } from 'rxjs/operators';
import { DeviceService } from '../../shared/services';
import { ClickEventParams } from '../../shared/types';

@Component({
  selector: 'fe-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  @Input() block?: IProfile | null;

  readonly size$ = this.device.device$.pipe(
    map(() => (this.device.isSFF() ? 8 : 10)),
  );

  private readonly trackableTagNames = ['A', 'SPAN'];

  constructor(
    readonly sanitizer: SanitizerService,
    private readonly device: DeviceService,
    private readonly tracker: TrackingService,
  ) {}

  onLinkClickFromEmitter(url: string | undefined, type: 'external') {
    const metadata: ClickEventParams = {
      pageTitle: this.tracker.pageTitle,
      pageType: 'home',
      pageUrl: this.tracker.pageUrl,
      section: 'profile_section',
      url,
    };
    type === 'external' && this.tracker.externalClickEvent({ ...metadata });
  }

  onLinkClickEvent(event: Event, type: 'external') {
    const tagName = (event?.target as HTMLElement)?.tagName;
    const trackable = this.trackableTagNames.includes(tagName);
    let url: string;

    if (trackable) {
      const metadata: ClickEventParams = {
        pageTitle: this.tracker.pageTitle,
        pageType: 'home',
        pageUrl: this.tracker.pageUrl,
        section: 'profile_section',
        url: undefined,
      };
      if (tagName === 'A') {
        url = (event?.target as HTMLAnchorElement)?.href;
        metadata.url = url;
      } else if (tagName === 'SPAN') {
        url = (
          (event?.target as HTMLSpanElement)?.parentElement as HTMLAnchorElement
        )?.href;
        metadata.url = url;
      }
      type === 'external' && this.tracker.externalClickEvent({ ...metadata });
    }
  }

  trackBySocialFn(_: number, data: ISocial) {
    return data.icon;
  }

  trackByIndexFn(index: number) {
    return index;
  }

  trackByBlogFn(_: number, data: IBlog) {
    return data.url;
  }
}
