import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TrackingService } from '@frontend/components';
import { IEducation } from '@frontend/connector-interfaces';
import { ToggleEventParams } from '../../shared/types';

@Component({
  selector: 'fe-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationComponent {
  @Input() block?: IEducation[] | null;

  constructor(private readonly tracker: TrackingService) {}

  trackToggleState(state: boolean, type: 'external') {
    const metadata: ToggleEventParams = {
      pageTitle: this.tracker.pageTitle,
      pageType: 'home',
      pageUrl: this.tracker.pageUrl,
      section: 'education_section',
      state,
    };
    type === 'external' && this.tracker.uiToggleEvent({ ...metadata });
  }
}
