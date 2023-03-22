import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fe-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {}
