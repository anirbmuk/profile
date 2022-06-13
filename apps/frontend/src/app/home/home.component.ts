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
import {
  EducationImpressionParams,
  GitHubImpressionParams,
  TechstackImpressionParams,
} from '../shared/types';
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
  readonly tsCallback = this.tracker.trackImpressionEvent.bind(this.tracker, {
    pageTitle: this.tracker.pageTitle,
    pageType: 'home',
    pageUrl: '/',
    section: 'techstack',
  } as TechstackImpressionParams);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly ghCallback = this.data.fetchCallback.bind(this.data, 'github');
  readonly ghTrackingCallback = this.tracker.trackImpressionEvent.bind(
    this.tracker,
    {
      pageTitle: this.tracker.pageTitle,
      pageType: 'home',
      pageUrl: '/',
      section: 'github',
    } as GitHubImpressionParams
  );

  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly edCallback = this.data.fetchCallback.bind(this.data, 'education');
  readonly edTrackingCallback = this.tracker.trackImpressionEvent.bind(
    this.tracker,
    {
      pageTitle: this.tracker.pageTitle,
      pageType: 'home',
      pageUrl: '/',
      section: 'education',
    } as EducationImpressionParams
  );

  readonly showScroll$ = fromEvent(this.document, 'scroll').pipe(
    map(() => this.viewport.getScrollPosition()?.[1] > 500)
  );

  constructor(
    readonly data: DataService,
    private readonly seo: SeoService,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly viewport: ViewportScroller,
    private readonly tracker: TrackingService
  ) {}

  ngOnInit(): void {
    this.seo.setMetaTags({
      url: '/',
      title: environment.about,
      description: environment.about,
      robots: `${Robots.INDEX},${Robots.FOLLOW}`,
      image: '/assets/images/seo.jpg',
    } as ITag);
    this.seo.setCanonical('/');
    this.seo.setTitle(environment.title);
    this.tracker.trackPageViewEvent({
      pageTitle: this.seo.pageTitle,
      pageType: 'home',
      pageUrl: '/',
    });
  }

  onScrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }
}
