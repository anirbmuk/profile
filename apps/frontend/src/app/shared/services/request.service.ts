import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const globalPrefix = 'api';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private readonly http: HttpClient) {}

  get<T>(path: string) {
    return this.http.get<T>(`/${globalPrefix}/${path}`);
  }
}
