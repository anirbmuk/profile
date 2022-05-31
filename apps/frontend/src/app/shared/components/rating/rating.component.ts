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
  _minRating = 0;
  _maxRating = 10;

  @Input() set rating(rating: number | string) {
    this._rating = Math.max(
      Math.min(isNaN(+rating) ? 1 : +rating, this._maxRating),
      this._minRating
    );
    this._fullRating = Math.floor(this._rating);
    this._hasHalf = Math.ceil(this._rating) !== this._rating;
    this._remaining = this._maxRating - Math.ceil(this._rating);
  }
}
