export type TrackingEvents =
  | 'page_view'
  | 'impression'
  | 'internal_click'
  | 'external_click'
  | 'view_list'
  | 'view_list_item';

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
