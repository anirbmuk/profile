import { DOCUMENT, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
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
  readonly showScroll$ = fromEvent(this.document, 'scroll').pipe(
    map(() => this.viewport.getScrollPosition()?.[1] > 500),
  );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  tsTrackingCallback?: (() => void) | undefined = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ghTrackingCallback?: (() => void) | undefined = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  edTrackingCallback?: (() => void) | undefined = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  blTrackingCallback?: (() => void) | undefined = () => {};

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

    this.initTrackingCallbacks();
  }

  onScrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }

  private initTrackingCallbacks() {
    this.tsTrackingCallback = this.tracker.trackImpressionCollectionEvent.bind(
      this.tracker,
      {
        pageTitle: this.tracker.pageTitle,
        pageType: 'home',
        pageUrl: this.tracker.pageUrl,
        event_section: 'techstack_section',
      } as ImpressionEventParams,
    );

    this.ghTrackingCallback = this.tracker.trackImpressionCollectionEvent.bind(
      this.tracker,
      {
        pageTitle: this.tracker.pageTitle,
        pageType: 'home',
        pageUrl: this.tracker.pageUrl,
        event_section: 'github_section',
      } as ImpressionEventParams,
    );

    this.edTrackingCallback = this.tracker.trackImpressionCollectionEvent.bind(
      this.tracker,
      {
        pageTitle: this.tracker.pageTitle,
        pageType: 'home',
        pageUrl: this.tracker.pageUrl,
        event_section: 'education_section',
      } as ImpressionEventParams,
    );

    this.blTrackingCallback = this.tracker.trackImpressionCollectionEvent.bind(
      this.tracker,
      {
        pageTitle: this.tracker.pageTitle,
        pageType: 'home',
        pageUrl: this.tracker.pageUrl,
        event_section: 'blog_section',
      } as ImpressionEventParams,
    );
  }
}
