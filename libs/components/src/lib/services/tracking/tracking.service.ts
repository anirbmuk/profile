import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ServiceModule } from '../service.module';
import { buildGTMScript, GTM_ID, PRODUCTION } from './config';
import { BaseEvent, BaseEventParams } from './tracking.type';

@Injectable({
  providedIn: ServiceModule,
})
export class TrackingService {
  constructor(
    @Inject(GTM_ID) private readonly gtmId: string,
    @Inject(PRODUCTION) private readonly production: boolean,
    @Inject(DOCUMENT) private readonly document: Document,
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly title: Title,
  ) {}

  private isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  private async track<T extends BaseEventParams>(
    event: BaseEvent,
    metadata: T,
  ) {
    if (this.isBrowser()) {
      return new Promise((resolve, reject) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const dataLayer = (window as any)?.dataLayer || [];
          dataLayer.push({
            ...event,
            ...metadata,
            clientTimestamp: this.clientTimestamp,
            locale: window.navigator.language,
            agent: window.navigator.userAgent,
            vendor: window.navigator.vendor,
            platform: window.navigator.platform,
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

  get clientTimestamp() {
    const date = new Date();
    const dd = `${date.getDate()}`.padStart(2, '0');
    const mm = `${date.getMonth() + 1}`.padStart(2, '0');
    const yyyy = `${date.getUTCFullYear()}`;
    const hh = `${date.getHours()}`.padStart(2, '0');
    const mi = `${date.getMinutes()}`.padStart(2, '0');
    const ss = `${date.getSeconds()}`.padStart(2, '0');
    return `${dd}/${mm}/${yyyy} ${hh}:${mi}:${ss}`;
  }

  buildHeadScript(renderer: Renderer2) {
    if (this.isBrowser()) {
      let headScript: string;
      if (this.gtmId && this.production) {
        headScript = buildGTMScript(this.gtmId);
      } else {
        headScript = '(function() { window.dataLayer = []; })()';
      }
      const script: HTMLScriptElement = renderer.createElement('script');
      script.text = headScript;
      script.defer = true;
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
    this.track({ event: 'page_view' }, metaData);
  }

  trackImpressionCollectionEvent<T extends BaseEventParams>(metaData: T) {
    this.track({ event: 'view_list' }, metaData);
  }

  trackImpressionItemEvent<T extends BaseEventParams>(metaData: T) {
    this.track({ event: 'view_list_item' }, metaData);
  }

  internalClickEvent<T extends BaseEventParams>(metaData: T) {
    this.track({ event: 'internal_click' }, metaData);
  }

  externalClickEvent<T extends BaseEventParams>(metaData: T) {
    this.track({ event: 'external_click' }, metaData);
  }

  get pageTitle(): string {
    return this.title.getTitle();
  }

  get pageUrl(): string {
    return this.isBrowser() ? window.location.href : '';
  }
}
