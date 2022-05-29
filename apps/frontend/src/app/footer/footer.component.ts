import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IFooterBlock } from '@frontend/connector-interfaces';

@Component({
  selector: 'fe-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() block?: IFooterBlock | null;
}
