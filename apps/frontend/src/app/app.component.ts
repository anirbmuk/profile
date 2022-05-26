import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IFooterBlock,
  IGitHub,
  IProfile,
  ITechstack,
} from '@frontend/connector-interfaces';

@Component({
  selector: 'fe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  profile$ = this.http.get<IProfile>('/api/profile');
  techstack$ = this.http.get<ITechstack>('/api/techstack');
  github$ = this.http.get<IGitHub[]>('/api/github');
  footer$ = this.http.get<IFooterBlock>('/api/footer');
  constructor(private http: HttpClient) {}
}
