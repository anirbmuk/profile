import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'fe-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  expanded = true;

  @Output() toggleState = new EventEmitter<boolean>();

  toggle() {
    this.expanded = !this.expanded;
    this.toggleState.emit(this.expanded);
  }
}
