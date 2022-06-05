import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SanitizerService } from '@frontend/components';
import { IProfile } from '@frontend/connector-interfaces';
import { map } from 'rxjs/operators';
import { DeviceService } from '../../shared/services';

@Component({
  selector: 'fe-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  @Input() block?: IProfile | null;

  readonly size$ = this.device.device$.pipe(
    map(() => (this.device.isSFF() ? 8 : 10))
  );

  constructor(
    readonly sanitizer: SanitizerService,
    private readonly device: DeviceService
  ) {}
}
