import { Directive, HostListener, Input } from '@angular/core';

type IHover = {
  elements: HTMLDivElement[];
  classList?: string | undefined;
};

@Directive({
  selector: '[feHover]',
})
export class HoverDirective {
  @Input() feHover?: IHover;

  @HostListener('mouseenter') onMouseover() {
    if (this.feHover?.elements) {
      for (const element of this.feHover?.elements) {
        this.feHover?.classList &&
          element.classList?.add?.(this.feHover?.classList);
      }
    }
  }

  @HostListener('mouseleave') onMouseleave() {
    if (this.feHover?.elements) {
      for (const element of this.feHover?.elements) {
        this.feHover?.classList &&
          element.classList?.remove?.(this.feHover?.classList);
      }
    }
  }
}
