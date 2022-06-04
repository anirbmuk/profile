import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'fe-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
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
  iconClass = 'w-4 h-4';
  source?: string | undefined;
  target?: string | undefined;
  displayClass?: string;

  sizeMappers: Record<number, string> = {
    2: 'h-2 w-2',
    3: 'h-3 w-3',
    4: 'h-4 w-4',
    5: 'h-5 w-5',
    6: 'h-6 w-6',
    7: 'h-7 w-7',
    8: 'h-8 w-8',
    9: 'h-9 w-9',
    10: 'h-10 w-10',
    12: 'h-12 w-12',
    14: 'h-14 w-14',
    16: 'h-16 w-16',
  };

  displayClasses: Record<'start' | 'middle' | 'end', string> = {
    start: 'block md:flex md:justify-start',
    middle: 'block md:flex md:justify-center',
    end: 'block md:flex md:justify-end',
  };
}
