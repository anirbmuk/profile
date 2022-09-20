import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

const globalPrefix = 'api';
const pathPrefix = environment.hostUrl;

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private readonly http: HttpClient) {}

  get<T>(path: string) {
    return this.http.get<T>(`${pathPrefix}/${globalPrefix}/${path}`);
  }

  web(url: string) {
    return this.http.get(url, { responseType: 'text' });
  }
}
