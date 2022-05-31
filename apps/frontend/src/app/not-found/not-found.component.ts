import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ITag, Robots, SeoService } from '../shared/services';

@Component({
  selector: 'fe-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setMetaTags({
      url: '/notfound',
      title: '404',
      description: '404 page',
      robots: `${Robots.NOINDEX},${Robots.NOFOLLOW}`,
    } as ITag);
    this.seo.setTitle('404');
    this.seo.setCanonical('/notfound');
  }
}
