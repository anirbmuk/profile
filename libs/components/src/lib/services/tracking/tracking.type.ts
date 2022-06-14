// export enum TrackingEvents {
//   pageview = 'pageview',
//   impression = 'impression',
//   toggle = 'toggle',
//   internalclick = 'internalclick',
//   externalclick = 'externalclick',
// }

export type TrackingEvents =
  | 'pageview'
  | 'impression'
  | 'toggle'
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

// export interface PageViewEvent extends BaseEvent {
//   event: TrackingEvents.pageview;
// }

// export interface ImpressionEvent extends BaseEvent {
//   event: TrackingEvents.impression;
// }

// export interface InternalClickEvent extends BaseEvent {
//   event: TrackingEvents.internalclick;
// }

// export interface ExternalClickEvent extends BaseEvent {
//   event: TrackingEvents.externalclick;
// }

// export interface UIToggleEvent extends BaseEvent {
//   event: TrackingEvents.toggle;
// }
