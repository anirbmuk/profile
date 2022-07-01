import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IEducation } from '@frontend/connector-interfaces';

@Component({
  selector: 'fe-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationComponent {
  @Input() block?: IEducation[] | null;

  trackByKeyFn(_: number, data: IEducation) {
    return data.documentid;
  }
}
