import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TrackingService } from '@frontend/components';
import { IGitHub } from '@frontend/connector-interfaces';
import { ClickEventParams } from '../../types';

@Component({
  selector: 'fe-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent {
  @Input() repo?: IGitHub;

  constructor(private readonly tracker: TrackingService) {}

  onLinkClick(type: 'external', url?: string | undefined) {
    const metadata: ClickEventParams = {
      pageTitle: this.tracker.pageTitle,
      pageType: 'home',
      pageUrl: '/home',
      source: 'github_section',
    };
    if (typeof url === 'string') {
      metadata.url = url;
    }
    type === 'external' && this.tracker.externalClickEvent({ ...metadata });
  }
}
