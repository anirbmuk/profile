import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IGitHub } from '@frontend/connector-interfaces';

@Component({
  selector: 'fe-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubComponent {
  _repositories: IGitHub[] = [];

  @Input() set block(block: IGitHub[] | undefined) {
    this._repositories =
      block?.sort((r1, r2) => r1.position - r2.position) || [];
  }
}
