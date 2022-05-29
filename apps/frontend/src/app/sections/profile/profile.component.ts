import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SanitizerService } from '@frontend/components';
import { IProfile } from '@frontend/connector-interfaces';

@Component({
  selector: 'fe-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  @Input() block?: IProfile | null;

  constructor(readonly sanitizer: SanitizerService) {}
}
