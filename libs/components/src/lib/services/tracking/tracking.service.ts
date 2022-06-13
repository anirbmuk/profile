import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ServiceModule } from '../service.module';
import { GTM_ID } from './config';
import {
  BaseEventParams,
  ExternalClickEvent,
  ImpressionEvent,
  PageViewEvent,
  UIToggleEvent,
} from './tracking.type';

@Injectable({
  providedIn: ServiceModule,
})
export class TrackingService {
  constructor(
    @Inject(GTM_ID) private readonly gtmId: string,
    @Inject(DOCUMENT) private readonly document: Document,
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly title: Title
  ) {}

  private isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  private async track<T extends BaseEventParams>(
    event: PageViewEvent | ImpressionEvent | ExternalClickEvent | UIToggleEvent,
    metadata: T
  ) {
    if (this.isBrowser()) {
      return new Promise((resolve, reject) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const dataLayer = (window as any)?.dataLayer || [];
          dataLayer.push({
            ...event,
            ...metadata,
          });
          resolve(dataLayer);
        } catch (error) {
          reject(error);
        }
      })
        .then()
        .catch((err) => console.error({ err }));
    } else {
      return Promise.resolve();
    }
  }

  buildHeadScript(renderer: Renderer2) {
    if (this.gtmId && this.isBrowser()) {
      const headScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-${this.gtmId}');`;
      const script: HTMLScriptElement = renderer.createElement('script');
      script.text = headScript;
      renderer.appendChild(this.document.head, script);
    }
  }

  buildBodyScript(renderer: Renderer2) {
    if (this.gtmId && this.isBrowser()) {
      const bodyScript = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-${this.gtmId}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      const script: HTMLElement = renderer.createElement('noscript');
      script.innerHTML = bodyScript;
      renderer.appendChild(this.document.body, script);
    }
  }

  trackPageViewEvent<T extends BaseEventParams>(metaData: T) {
    this.track({ event: 'pageview' } as PageViewEvent, metaData);
  }

  trackImpressionEvent<T extends BaseEventParams>(metaData: T) {
    this.track({ event: 'impression' } as ImpressionEvent, metaData);
  }

  externalClickEvent<T extends BaseEventParams>(metaData: T) {
    this.track({ event: 'click' } as ExternalClickEvent, metaData);
  }

  uiToggleEvent<T extends BaseEventParams>(metaData: T) {
    this.track({ event: 'toggle' } as UIToggleEvent, metaData);
  }

  get pageTitle(): string {
    return this.title.getTitle();
  }
}
