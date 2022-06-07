import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IError } from '.';

@Component({
  selector: 'fe-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute) {}

  data: Observable<IError | undefined> = EMPTY;

  ngOnInit(): void {
    this.data = this.route.data.pipe(
      map((data) => (data.errorData as IError) || undefined)
    );
  }
}
