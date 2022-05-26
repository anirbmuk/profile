import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FOOTER,
  GITHUB,
  IFooterBlock,
  IGitHub,
  IProfile,
  ITechstack,
  PROFILE,
  TECHSTACK,
} from '@frontend/connector-interfaces';
import { RequestService } from './shared/services';

@Component({
  selector: 'fe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly profile$ = this.request.get<IProfile>(PROFILE);
  readonly techstack$ = this.request.get<ITechstack>(TECHSTACK);
  readonly github$ = this.request.get<IGitHub[]>(GITHUB);
  readonly footer$ = this.request.get<IFooterBlock>(FOOTER);

  constructor(private readonly request: RequestService) {}
}
