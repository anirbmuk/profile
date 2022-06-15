import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TrackingService } from '@frontend/components';
import { IGitHub } from '@frontend/connector-interfaces';
import { ToggleEventParams } from '../../shared/types';

@Component({
  selector: 'fe-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubComponent {
  _repositories: IGitHub[] = [];

  @Input() set block(block: IGitHub[] | null) {
    this._repositories =
      block?.sort((r1, r2) => r1.position - r2.position) || [];
  }

  constructor(private readonly tracker: TrackingService) {}

  trackToggleState(state: boolean, type: 'external') {
    const metadata: ToggleEventParams = {
      pageTitle: this.tracker.pageTitle,
      pageType: 'home',
      pageUrl: this.tracker.pageUrl,
      section: 'github_section',
      state,
    };
    type === 'external' && this.tracker.uiToggleEvent({ ...metadata });
  }
}
