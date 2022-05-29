import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITechstack } from '@frontend/connector-interfaces';

@Component({
  selector: 'fe-techstack',
  templateUrl: './techstack.component.html',
  styleUrls: ['./techstack.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechstackComponent {
  @Input() block?: ITechstack | null;
}
