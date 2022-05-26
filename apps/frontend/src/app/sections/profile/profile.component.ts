import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IProfile } from '@frontend/connector-interfaces';

@Component({
  selector: 'fe-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  @Input() block?: IProfile | null;
}
