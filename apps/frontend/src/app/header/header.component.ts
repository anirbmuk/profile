import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fe-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
