import { DOCUMENT, ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TrackingService } from '@frontend/components';
import { Subscription, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImpressionEventParams } from '../shared/types';
import { environment } from './../../environments/environment';
import { DataService, ITag, Robots, SeoService } from './../shared/services';
import { ICareer, IEducation, IGitHub, ITechstack } from '@frontend/connector-interfaces';

@Component({
  selector: 'fe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly showScroll$ = fromEvent(this.document, 'scroll').pipe(
    map(() => this.viewport.getScrollPosition()?.[1] > 500),
  );

  private subscriptions: Subscription[] = [];

  career?: ICareer[];
  techstack?: ITechstack;
  github?: IGitHub[];
  education?: IEducation[];

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
    this.subscriptions = [
      this.data.career$.subscribe((_career) => (this.career = _career)),
      this.data.techstack$.subscribe((_techstack) => (this.techstack = _techstack)),
      this.data.github$.subscribe((_github) => (this.github = _github)),
      this.data.education$.subscribe((_education) => (this.education = _education)),
    ];
    this.data.loadPageAction('home');

    this.initTrackingCallbacks();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
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
