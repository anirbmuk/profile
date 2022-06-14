import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITimeline } from '@frontend/connector-interfaces';

@Component({
  selector: 'fe-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent<T extends ITimeline> {
  _mappedTimelines: T[] = [];

  readonly heights: Record<number, string> = {
    1: 'h-24 md:h-32',
    2: 'h-32 md:h-40',
    3: 'h-40 md:h-48',
    4: 'h-48 md:h-56',
    5: 'h-56 md:h-64',
    6: 'h-64 md:h-72',
  };

  sortFn(start: string, end = this.getCurrentTimeline()) {
    const [endMonth, endYear] = end.split('/', 2);
    const [startMonth, startYear] = start.split('/', 2);
    return +endYear - +startYear || +endMonth - +startMonth;
  }

  @Input() set timelines(source: T[]) {
    this._mappedTimelines = (source || [])
      .sort((t1, t2) => this.sortFn(t1.start, t2.start))
      .map((each, index) => {
        return {
          ...each,
          size: this.getHeight(each.start, each.end),
          alignment: index % 2 === 0 ? 'left' : 'right',
        };
      });
  }

  getHeight(start: string, end = this.getCurrentTimeline()) {
    const [, endYear] = end.split('/', 2);
    const [, startYear] = start.split('/', 2);
    return this.heights[+endYear - +startYear || 1] || this.heights[1];
  }

  getCurrentTimeline(): string {
    const date = new Date();
    const mm = `${date.getMonth() + 1}`.padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${yyyy}`;
  }
}
