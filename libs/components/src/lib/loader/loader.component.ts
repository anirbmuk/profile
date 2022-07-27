import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'fe-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  @Input() loadingText = 'Loading';
}
