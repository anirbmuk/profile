import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ButtonType } from './button.type';

@Component({
  selector: 'fe-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() buttonType: ButtonType = { type: 'button' };
  @Output() onclick = new EventEmitter<void>();

  onButtonClick() {
    this.onclick.emit();
  }
}
