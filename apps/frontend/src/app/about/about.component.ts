import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SanitizerService } from '@frontend/components';
import { environment } from '../../environments/environment';
import { DataService, ITag, Robots, SeoService } from '../shared/services';

@Component({
  selector: 'fe-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  constructor(
    private readonly seo: SeoService,
    readonly data: DataService,
    readonly sanitizer: SanitizerService
  ) {}

  ngOnInit(): void {
    this.seo.setMetaTags({
      url: '/about',
      title: 'Anirban Mukherjee | All about me',
      description: environment.about,
      robots: `${Robots.INDEX},${Robots.FOLLOW}`,
    } as ITag);
    this.seo.setTitle('All about me');
    this.seo.setCanonical('/about');
  }
}
