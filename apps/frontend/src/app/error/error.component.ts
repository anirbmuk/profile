import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackingService } from '@frontend/components';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IError } from '.';
import { ClickEventParams } from '../shared/types';

@Component({
  selector: 'fe-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly tracker: TrackingService
  ) {}

  data: Observable<IError | undefined> = EMPTY;

  ngOnInit(): void {
    this.data = this.route.data.pipe(
      map((data) => (data.errorData as IError) || undefined)
    );
  }

  onLinkClick(type: 'internal') {
    const metadata: ClickEventParams = {
      pageTitle: this.tracker.pageTitle,
      pageType: 'home',
      pageUrl: '/error',
      source: 'error page',
      url: '/',
    };
    type === 'internal' && this.tracker.internalClickEvent({ ...metadata });
  }
}
