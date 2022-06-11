import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';

@Directive({
  selector: '[feTrackable]',
})
export class TrackableDirective implements OnDestroy {
  observer?: IntersectionObserver;
  tracked = false;
  _callback?: (() => void) | undefined;

  @Input() set feTrackable(callback: (() => void) | undefined) {
    this._callback = callback;
    if (isPlatformServer(this.platformId)) {
      callback?.();
    }
  }

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly elementRef: ElementRef
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const options: IntersectionObserverInit = {
        root: this.document,
        rootMargin: '0px',
        threshold: 1.0,
      };
      const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.intersectionRatio === 1 && !this.tracked) {
              this._callback?.();
              this.tracked = true;
            }
          }
        });
      };
      this.observer = new IntersectionObserver(intersectionCallback, options);
      const target = this.elementRef?.nativeElement;
      target && this.observer?.observe(target);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
