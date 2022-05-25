import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IDocument } from '@frontend/connector-interfaces';

@Component({
  selector: 'fe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  github$ = this.http.get<IDocument[]>('/api/github');
  constructor(private http: HttpClient) {}
}
