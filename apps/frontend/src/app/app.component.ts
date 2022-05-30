import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { forkJoin } from 'rxjs';
import { environment } from './../environments/environment';
import { ITag, RequestService, Robots, SeoService } from './shared/services';

@Component({
  selector: 'fe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly profile$ = this.request.get<[IProfile]>(PROFILE);
  readonly techstack$ = this.request.get<[ITechstack]>(TECHSTACK);
  readonly github$ = this.request.get<IGitHub[]>(GITHUB);
  readonly footer$ = this.request.get<[IFooterBlock]>(FOOTER);

  readonly bio$ = forkJoin<[IProfile], [ITechstack], IGitHub[], [IFooterBlock]>(
    [this.profile$, this.techstack$, this.github$, this.footer$]
  );

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
