import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SanitizerService, TrackingService } from '@frontend/components';
import { environment } from '../../environments/environment';
import { DataService, ITag, Robots, SeoService } from '../shared/services';
import { ClickEventParams } from '../shared/types';

@Component({
  selector: 'fe-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  private readonly trackableTagNames = ['A', 'SPAN'];

  constructor(
    private readonly seo: SeoService,
    readonly data: DataService,
    readonly sanitizer: SanitizerService,
    private readonly tracker: TrackingService
  ) {}

  ngOnInit(): void {
    this.seo.setMetaTags({
      url: '/about',
      title: 'Anirban Mukherjee | All about me',
      description: environment.about,
      robots: `${Robots.INDEX},${Robots.FOLLOW}`,
      image: '/assets/images/seo.jpg',
    } as ITag);
    this.seo.setTitle('All about me');
    this.seo.setCanonical('/about');
    this.tracker.trackPageViewEvent({
      pageTitle: this.seo.pageTitle,
      pageType: 'about',
      pageUrl: this.tracker.pageUrl,
    });
  }

  onLinkClick(event: Event, type: 'external') {
    const tagName = (event?.target as HTMLElement)?.tagName;
    const trackable = this.trackableTagNames.includes(tagName);
    let url: string;

    if (trackable) {
      const metadata: ClickEventParams = {
        pageTitle: this.tracker.pageTitle,
        pageType: 'about',
        pageUrl: this.tracker.pageUrl,
        section: 'aboutme_section',
        url: undefined,
      };
      if (tagName === 'A') {
        url = (event?.target as HTMLAnchorElement)?.href;
        metadata.url = url;
      } else if (tagName === 'SPAN') {
        url = ((event?.target as HTMLSpanElement)
          ?.parentElement as HTMLAnchorElement)?.href;
        metadata.url = url;
      }
      type === 'external' && this.tracker.externalClickEvent({ ...metadata });
    }
  }
}
