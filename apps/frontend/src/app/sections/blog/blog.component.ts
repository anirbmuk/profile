import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TrackingService } from '@frontend/components';
import { IFeaturedBlog } from '@frontend/connector-interfaces';
import {
  ClickEventParams,
  ImpressionItemEventParams,
} from '../../shared/types';

@Component({
  selector: 'fe-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  @Input() block?: IFeaturedBlog[] | null;

  constructor(private readonly tracker: TrackingService) {}

  trackByKeyFn(_: number, data: IFeaturedBlog) {
    return data.documentid;
  }

  readonly blItemTrackingCallback = (item: unknown | undefined) =>
    this.tracker.trackImpressionItemEvent.bind(this.tracker, {
      pageTitle: this.tracker.pageTitle,
      pageType: 'home',
      pageUrl: this.tracker.pageUrl,
      section: 'blog_section',
      item,
    } as ImpressionItemEventParams);

  onLinkClick(type: 'external', url?: string | undefined) {
    const metadata: ClickEventParams = {
      pageTitle: this.tracker.pageTitle,
      pageType: 'home',
      pageUrl: this.tracker.pageUrl,
      section: 'blog_section',
      url: undefined,
    };
    if (typeof url === 'string') {
      metadata.url = url;
    }
    type === 'external' && this.tracker.externalClickEvent({ ...metadata });
  }
}
