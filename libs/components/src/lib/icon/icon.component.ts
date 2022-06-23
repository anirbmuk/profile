import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'fe-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Output() linkClick = new EventEmitter<string | undefined>();

  @Input() set url(value: string | undefined) {
    this.type = value ? 'link' : 'text';
    this.target = value;
  }

  @Input() set icon(value: string | undefined) {
    this.ariaLabel = value ? `${value.toLowerCase()}` : 'logo';
    this.source = value && `/assets/icons/${value}.svg`;
  }

  @Input() set size(value: number | null | undefined) {
    const defaultValue = 4;
    const useValue = value ?? defaultValue;
    this.iconClass =
      this.sizeMappers[useValue] || this.sizeMappers[defaultValue];
  }

  @Input() set position(positionValue: 'start' | 'middle' | 'end' | undefined) {
    this.displayClass = positionValue ? this.displayClasses[positionValue] : '';
  }

  type: 'link' | 'text' = 'text';
  ariaLabel?: string;
  iconClass = 'h-3 md:h-4 w-3 md:w-4';
  source?: string | undefined;
  target?: string | undefined;
  displayClass?: string;

  sizeMappers: Record<number, string> = {
    2: 'h-1 md:h-2 w-1 md:w-2',
    3: 'h-2 md:h-3 w-2 md:w-3',
    4: 'h-3 md:h-4 w-3 md:w-4',
    5: 'h-4 md:h-5 w-4 md: w-5',
    6: 'h-5 md:h-6 w-5 md:w-6',
    7: 'h-6 md:h-7 w-6 md:w-7',
    8: 'h-7 md:h-8 w-7 md:w-8',
    9: 'h-8 md:h-9 w-8 md:w-9',
    10: 'h-9 md:h-10 w-9 md:w-10',
    12: 'h-11 md:h-12 w-11 md:w-12',
    14: 'h-13 md:h-14 w-13 md:w-14',
    16: 'h-15 md:h-16 w-15 md:w-16',
  };

  displayClasses: Record<'start' | 'middle' | 'end', string> = {
    start: 'flex justify-start',
    middle: 'flex justify-center',
    end: 'flex justify-end',
  };

  onLinkClick(href: string | undefined) {
    this.linkClick.emit(href);
  }
}
