import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IGitHub } from '@frontend/connector-interfaces';

@Component({
  selector: 'fe-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent {
  @Input() repo?: IGitHub;
}
