export type TrackingEvents =
  | 'pageview'
  | 'impression'
  | 'internalclick'
  | 'externalclick';

export type ExternalLink = 'twitter' | 'linkedin' | 'github' | 'blogger';

export type PageType = 'home' | 'about' | 'footer';

export interface BaseEvent {
  event: TrackingEvents;
}

export interface BaseEventParams {
  pageType: PageType;
  pageUrl: string;
  pageTitle: string;
}
