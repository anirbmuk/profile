import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fe-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  expanded = true;

  toggle() {
    this.expanded = !this.expanded;
  }
}
