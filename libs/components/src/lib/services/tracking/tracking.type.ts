export enum TrackingEvents {
  pageview = 'pageview',
  impression = 'impression',
  toggle = 'toggle',
  click = 'click',
}

export type ExternalLink = 'twitter' | 'linkedin' | 'github' | 'blogger';

export type PageType = 'home' | 'about';

interface BaseEvent {
  event: TrackingEvents;
}

export interface BaseEventParams {
  pageType: PageType;
  pageUrl: string;
  pageTitle: string;
}

export interface PageViewEvent extends BaseEvent {
  event: TrackingEvents.pageview;
}

export interface ImpressionEvent extends BaseEvent {
  event: TrackingEvents.impression;
}

export interface ExternalClickEvent extends BaseEvent {
  event: TrackingEvents.click;
}

export interface UIToggleEvent extends BaseEvent {
  event: TrackingEvents.toggle;
}
