import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'fe-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockComponent {
  @Input() style: 'normal' | 'inverted' = 'normal';
}
