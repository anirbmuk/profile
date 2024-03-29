import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TrackingService } from '@frontend/components';
import { IFooterBlock, ILink } from '@frontend/connector-interfaces';
import { ClickEventParams } from '../shared/types';

@Component({
  selector: 'fe-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() block?: IFooterBlock | null;

  readonly year = new Date().getFullYear();

  constructor(private readonly tracker: TrackingService) {}

  onLinkClick(type: 'internal' | 'external', url: string | undefined) {
    const metadata: ClickEventParams = {
      pageTitle: this.tracker.pageTitle,
      pageType: 'footer',
      pageUrl: this.tracker.pageUrl,
      event_section: 'footer_section',
      event_url: url,
    };
    type === 'internal'
      ? this.tracker.internalClickEvent({ ...metadata })
      : this.tracker.externalClickEvent({ ...metadata });
  }

  trackByKeyFn(_: number, data: ILink) {
    return data.text;
  }
}
