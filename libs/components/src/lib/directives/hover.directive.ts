import { Directive, HostListener, Input } from '@angular/core';

type IHover = {
  elements: HTMLDivElement[];
  classList?: string | undefined;
};

@Directive({
  selector: '[feHover]',
})
export class HoverDirective {
  @Input() set feHover(content: IHover) {
    this._elements = content?.elements ? [...content?.elements] : [];
    this._classes = content?.classList?.split(' ') || [];
  }

  _classes?: string[] = [];
  _elements?: HTMLDivElement[] = [];

  @HostListener('mouseenter') onMouseover() {
    if (this._elements && this._classes) {
      for (const element of this._elements) {
        for (const userClass of this._classes) {
          userClass && element.classList?.add?.(userClass);
        }
      }
    }
  }

  @HostListener('mouseleave') onMouseleave() {
    if (this._elements && this._classes) {
      for (const element of this._elements) {
        for (const userClass of this._classes) {
          userClass && element.classList?.remove?.(userClass);
        }
      }
    }
  }
}
