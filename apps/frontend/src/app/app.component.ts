import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  IFooterBlock,
  IGitHub,
  IProfile,
  ITechstack,
} from '@frontend/connector-interfaces';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'fe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  profile$ = this.http.get<IProfile>('/api/profile').pipe(delay(3000));
  techstack$ = this.http.get<ITechstack>('/api/techstack').pipe(delay(3000));
  github$ = this.http.get<IGitHub[]>('/api/github').pipe(delay(3000));
  footer$ = this.http.get<IFooterBlock>('/api/footer').pipe(delay(3000));
  constructor(private http: HttpClient) {}
}
