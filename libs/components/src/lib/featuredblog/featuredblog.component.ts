import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IScrape, ScraperService } from '@frontend/components';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fe-featuredblog',
  templateUrl: './featuredblog.component.html',
  styleUrls: ['./featuredblog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedblogComponent implements OnInit {
  @Input() url = '';
  @Output() blogclick = new EventEmitter<void>();

  featuredBlog$: Observable<IScrape> | null = null;

  constructor(
    private readonly scraper: ScraperService,
    private readonly http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.featuredBlog$ = this.http
      .get(this.url, { responseType: 'text' })
      .pipe(map((html) => this.scraper.scrape(html)));
  }

  onFeaturedBlogClick() {
    this.blogclick.emit();
  }
}
