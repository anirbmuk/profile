import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ITag, Robots, SeoService } from '../shared/services';

@Component({
  selector: 'fe-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor(private readonly seo: SeoService) {}

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
