import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITechstack } from '@frontend/connector-interfaces';

@Component({
  selector: 'fe-techstack',
  templateUrl: './techstack.component.html',
  styleUrls: ['./techstack.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechstackComponent {
  technologies?: ITechstack['technology'];
  databases?: ITechstack['database'];

  @Input() set block(block: ITechstack | undefined) {
    this.technologies =
      block?.technology?.sort((t1, t2) => t1.position - t2.position) || [];
    this.databases =
      block?.database?.sort((d1, d2) => d1.position - d2.position) || [];
  }

  trackByTechnologyFn(
    _: number,
    data: {
      name: string;
      rating: number;
      position: number;
      icon?: string;
      url?: string | undefined;
    },
  ) {
    return data.name;
  }

  trackByDatabaseFn(
    _: number,
    data: {
      name: string;
      rating: number;
      position: number;
      icon?: string;
      url?: string | undefined;
    },
  ) {
    return data.name;
  }
}
