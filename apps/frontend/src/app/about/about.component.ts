import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SanitizerService, TrackingService } from '@frontend/components';
import { IAboutme } from '@frontend/connector-interfaces';
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
    private readonly tracker: TrackingService,
  ) {}

  ngOnInit(): void {
    const title = 'Anirban Mukherjee (anirbmuk) | All about me';
    this.seo.setMetaTags({
      url: '/about',
      title,
      description: environment.about,
      robots: `${Robots.INDEX},${Robots.FOLLOW}`,
      image: '/assets/images/seo.webp',
    } as ITag);
    this.seo.setTitle(title);
    this.seo.setCanonical('/about');
    this.tracker.trackPageViewEvent({
      pageTitle: this.seo.pageTitle,
      pageType: 'about',
      pageUrl: this.tracker.pageUrl,
    });
    this.data.loadPageAction('about');
  }

  trackByKeyFn(_: number, data: IAboutme) {
    return data.documentid;
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
        event_section: 'aboutme_section',
        event_url: undefined,
      };
      if (tagName === 'A') {
        url = (event?.target as HTMLAnchorElement)?.href;
        metadata.event_url = url;
      } else if (tagName === 'SPAN') {
        url = ((event?.target as HTMLSpanElement)?.parentElement as HTMLAnchorElement)
          ?.href;
        metadata.event_url = url;
      }
      type === 'external' && this.tracker.externalClickEvent({ ...metadata });
    }
  }
}
