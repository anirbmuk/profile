import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SanitizerService, TrackingService } from '@frontend/components';
import {
  IArtifact,
  IBlog,
  IProfile,
  ISocial,
} from '@frontend/connector-interfaces';
import { map } from 'rxjs/operators';
import { DeviceService, FileService } from '../../shared/services';
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
    private readonly fileService: FileService,
  ) {}

  onLinkClickFromEmitter(url: string | undefined, type: 'external') {
    const metadata: ClickEventParams = {
      pageTitle: this.tracker.pageTitle,
      pageType: 'home',
      pageUrl: this.tracker.pageUrl,
      event_section: 'profile_section',
      event_url: url,
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
        event_section: 'profile_section',
        event_url: undefined,
      };
      if (tagName === 'A') {
        url = (event?.target as HTMLAnchorElement)?.href;
        metadata.event_url = url;
      } else if (tagName === 'SPAN') {
        url = (
          (event?.target as HTMLSpanElement)?.parentElement as HTMLAnchorElement
        )?.href;
        metadata.event_url = url;
      }
      type === 'external' && this.tracker.externalClickEvent({ ...metadata });
    }
  }

  onDownloadResume(artifacts: IArtifact[] | undefined) {
    if (artifacts) {
      const [resume] = artifacts?.filter(
        (artifact) => artifact.category === 'resume',
      );
      if (resume) {
        this.fileService.downloadFile(resume.url);
        this.tracker.externalClickEvent({
          pageTitle: this.tracker.pageTitle,
          pageType: 'home',
          pageUrl: this.tracker.pageUrl,
          event_section: 'profile_section',
          event_url: resume.url,
        } as ClickEventParams);
      }
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
