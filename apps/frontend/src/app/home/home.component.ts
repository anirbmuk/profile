import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { DataService, ITag, Robots, SeoService } from './../shared/services';

@Component({
  selector: 'fe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly tsCallback = this.data.callback.bind(
    this,
    'tracked techstack section'
  );
  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly ghCallback = this.data.callback.bind(this, 'tracked github section');

  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly edCallback = this.data.fetchCallback.bind(this.data, 'education');

  constructor(readonly data: DataService, private readonly seo: SeoService) {}

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
