import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICareer } from '@frontend/connector-interfaces';

@Component({
  selector: 'fe-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerComponent {
  @Input() block?: ICareer[] | null = [];
}
