import { DOCUMENT, ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { TrackingService } from '@frontend/components';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImpressionEventParams } from '../shared/types';
import { environment } from './../../environments/environment';
import { DataService, ITag, Robots, SeoService } from './../shared/services';

@Component({
  selector: 'fe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly tsTrackingCallback =
    this.tracker.trackImpressionCollectionEvent.bind(this.tracker, {
      pageTitle: this.tracker.pageTitle,
      pageType: 'home',
      pageUrl: this.tracker.pageUrl,
      section: 'techstack_section',
    } as ImpressionEventParams);

  readonly ghTrackingCallback =
    this.tracker.trackImpressionCollectionEvent.bind(this.tracker, {
      pageTitle: this.tracker.pageTitle,
      pageType: 'home',
      pageUrl: this.tracker.pageUrl,
      section: 'github_section',
    } as ImpressionEventParams);

  readonly edTrackingCallback =
    this.tracker.trackImpressionCollectionEvent.bind(this.tracker, {
      pageTitle: this.tracker.pageTitle,
      pageType: 'home',
      pageUrl: this.tracker.pageUrl,
      section: 'education_section',
    } as ImpressionEventParams);

  readonly caTrackingCallback =
    this.tracker.trackImpressionCollectionEvent.bind(this.tracker, {
      pageTitle: this.tracker.pageTitle,
      pageType: 'home',
      pageUrl: this.tracker.pageUrl,
      section: 'career_section',
    } as ImpressionEventParams);

  readonly showScroll$ = fromEvent(this.document, 'scroll').pipe(
    map(() => this.viewport.getScrollPosition()?.[1] > 500),
  );

  constructor(
    readonly data: DataService,
    private readonly seo: SeoService,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly viewport: ViewportScroller,
    private readonly tracker: TrackingService,
  ) {}

  ngOnInit(): void {
    this.seo.setMetaTags({
      url: '/',
      title: environment.title,
      description: environment.about,
      robots: `${Robots.INDEX},${Robots.FOLLOW}`,
      image: '/assets/images/seo.webp',
    } as ITag);
    this.seo.setCanonical('/');
    this.seo.setTitle(environment.title);
    this.tracker.trackPageViewEvent({
      pageTitle: this.seo.pageTitle,
      pageType: 'home',
      pageUrl: this.tracker.pageUrl,
    });
    this.data.loadPageAction('home');
  }

  onScrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }
}
