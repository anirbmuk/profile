import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[feBlur]',
})
export class BlurDirective implements OnInit, OnChanges, OnDestroy {
  @Input() set feBlur(apply: boolean) {
    this._apply = apply;
  }

  observer?: IntersectionObserver;
  _apply = false;
  _target?: HTMLDivElement;

  readonly classes = [
    'lg:opacity-0',
    'lg:opacity-10',
    'lg:opacity-20',
    'lg:opacity-30',
    'lg:opacity-40',
    'lg:opacity-50',
    'lg:opacity-60',
    'lg:opacity-70',
    'lg:opacity-90',
    'lg:opacity-100',
  ];

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._target = this.elementRef?.nativeElement;
      const options: IntersectionObserverInit = {
        root: this.document,
        rootMargin: '0px',
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1.0],
      };
      const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.intersectionRatio <= 0.1) {
              this.removeClasses(this._target);
              this.renderer.addClass(this._target, 'lg:opacity-0');
            } else if (
              entry.intersectionRatio > 0.1 &&
              entry.intersectionRatio <= 0.2
            ) {
              this.removeClasses(this._target);
              this.renderer.addClass(this._target, 'lg:opacity-10');
            } else if (
              entry.intersectionRatio > 0.2 &&
              entry.intersectionRatio <= 0.3
            ) {
              this.removeClasses(this._target);
              this.renderer.addClass(this._target, 'lg:opacity-20');
            } else if (
              entry.intersectionRatio > 0.3 &&
              entry.intersectionRatio <= 0.4
            ) {
              this.removeClasses(this._target);
              this.renderer.addClass(this._target, 'lg:opacity-30');
            } else if (
              entry.intersectionRatio > 0.4 &&
              entry.intersectionRatio <= 0.5
            ) {
              this.removeClasses(this._target);
              this.renderer.addClass(this._target, 'lg:opacity-40');
            } else if (
              entry.intersectionRatio > 0.5 &&
              entry.intersectionRatio <= 0.6
            ) {
              this.removeClasses(this._target);
              this.renderer.addClass(this._target, 'lg:opacity-50');
            } else if (
              entry.intersectionRatio > 0.6 &&
              entry.intersectionRatio <= 0.7
            ) {
              this.removeClasses(this._target);
              this.renderer.addClass(this._target, 'lg:opacity-60');
            } else if (
              entry.intersectionRatio > 0.7 &&
              entry.intersectionRatio <= 0.8
            ) {
              this.removeClasses(this._target);
              this.renderer.addClass(this._target, 'lg:opacity-90');
            } else {
              this.removeClasses(this._target);
              this.renderer.addClass(this._target, 'lg:opacity-100');
            }
          }
        });
      };
      this.observer = new IntersectionObserver(intersectionCallback, options);
      this._target && this._apply && this.observer?.observe(this._target);
    }
  }

  ngOnChanges(): void {
    if (this._apply) {
      this._target && this.observer?.observe(this._target);
    } else {
      this.observer?.disconnect();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private removeClasses(target: unknown) {
    for (const _class of this.classes) {
      this.renderer.removeClass(target, _class);
    }
  }
}
