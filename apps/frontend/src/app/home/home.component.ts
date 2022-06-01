import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  GITHUB,
  IGitHub,
  IProfile,
  ITechstack,
  PROFILE,
  TECHSTACK,
} from '@frontend/connector-interfaces';
import { forkJoin } from 'rxjs';
import { environment } from './../../environments/environment';
import { ITag, RequestService, Robots, SeoService } from './../shared/services';

@Component({
  selector: 'fe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  readonly profile$ = this.request.get<[IProfile]>(PROFILE);
  readonly techstack$ = this.request.get<[ITechstack]>(TECHSTACK);
  readonly github$ = this.request.get<IGitHub[]>(GITHUB);

  readonly bio$ = forkJoin<[IProfile], [ITechstack], IGitHub[]>([
    this.profile$,
    this.techstack$,
    this.github$,
  ]);

  private readonly callback = (message: string) => console.log(message);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly callback1 = this.callback.bind(this, 'tracked techstack section');
  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly callback2 = this.callback.bind(this, 'tracked github section');

  constructor(
    private readonly request: RequestService,
    private readonly seo: SeoService
  ) {}

  ngOnInit(): void {
    this.seo.setMetaTags({
      url: '/',
      title: environment.about,
      description: environment.about,
      robots: `${Robots.INDEX},${Robots.FOLLOW}`,
    } as ITag);
    this.seo.setCanonical('/');
    this.seo.setTitle(environment.title);
  }
}
