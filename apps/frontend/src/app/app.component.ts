import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IDocument } from '@frontend/connector-interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  github$ = this.http
    .get<{ items: IDocument[] }>('/api/github')
    .pipe(map((data) => data.items));
  constructor(private http: HttpClient) {}
}
