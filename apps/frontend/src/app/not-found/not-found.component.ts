import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TrackingService } from '@frontend/components';
import { ITag, Robots, SeoService } from '../shared/services';
import { ClickEventParams } from '../shared/types';

@Component({
  selector: 'fe-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit {
  constructor(
    private readonly seo: SeoService,
    private readonly tracker: TrackingService
  ) {}

  ngOnInit(): void {
    this.seo.setMetaTags({
      url: '/notfound',
      title: '404',
      description: '404 page',
      robots: `${Robots.NOINDEX},${Robots.NOFOLLOW}`,
    } as ITag);
    this.seo.setTitle('404');
    this.seo.setCanonical('/notfound');
  }

  onLinkClick(type: 'internal' | 'external') {
    const metadata: ClickEventParams = {
      pageTitle: this.tracker.pageTitle,
      pageType: 'home',
      pageUrl: '/notfound',
      source: 'notfound',
    };
    type === 'internal'
      ? this.tracker.internalClickEvent({ ...metadata })
      : this.tracker.externalClickEvent({ ...metadata });
  }
}
