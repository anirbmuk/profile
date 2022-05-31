import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'fe-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {
  _rating = 1;
  _fullRating = 1;
  _hasHalf = false;
  _remaining = 0;

  @Input() set rating(rating: number | string) {
    this._rating = isNaN(+rating) ? 1 : +rating;
    this._fullRating = Math.ceil(this._rating);
    this._hasHalf = Math.ceil(this._rating) !== this._rating;
    this._remaining = 10 - Math.ceil(this._rating);
  }
}
