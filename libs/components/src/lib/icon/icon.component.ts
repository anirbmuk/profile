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
    const useValue = value ?? 8;
    this.iconClass = `w-${useValue} h-${useValue}`;
  }

  type: 'link' | 'text' = 'link';
  ariaLabel?: string;
  iconClass = 'w-8 h-8';
  source?: string | undefined;
  target?: string | undefined;
}
