import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ILink } from '@frontend/connector-interfaces';

@Component({
  selector: 'fe-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  @Input() link?: ILink;
  @Output() linkClick = new EventEmitter<'internal' | 'external'>();

  onLinkClick(type: 'internal' | 'external') {
    this.linkClick.emit(type);
  }
}
