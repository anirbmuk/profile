import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FOOTER, IFooterBlock } from '@frontend/connector-interfaces';
import { RequestService } from './shared/services';

@Component({
  selector: 'fe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly footer$ = this.request.get<[IFooterBlock]>(FOOTER);

  constructor(private readonly request: RequestService) {}
}
