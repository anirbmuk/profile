import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from '../shared/services';

@Component({
  selector: 'fe-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(readonly data: DataService) {}
}
