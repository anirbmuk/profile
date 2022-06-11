import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fe-headshot',
  templateUrl: './headshot.component.html',
  styleUrls: ['./headshot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadshotComponent {}
