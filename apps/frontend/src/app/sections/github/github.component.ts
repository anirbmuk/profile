import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IGitHub } from '@frontend/connector-interfaces';

@Component({
  selector: 'fe-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubComponent {
  @Input() block?: IGitHub[] | null;
}
