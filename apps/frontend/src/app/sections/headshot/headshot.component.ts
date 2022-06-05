import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { DeviceService } from '../../shared/services';

@Component({
  selector: 'fe-headshot',
  templateUrl: './headshot.component.html',
  styleUrls: ['./headshot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadshotComponent {
  constructor(private readonly device: DeviceService) {}

  readonly frame$ = this.device.device$.pipe(
    map(() => {
      return {
        form: this.device.getFormFactor(),
        asset: `/assets/images/${this.device.getFormFactor()}.png`,
      };
    })
  );
}
