import { Injectable } from '@angular/core';
import {
  ABOUTME,
  BLOG,
  CAREER,
  EDUCATION,
  GITHUB,
  IAboutme,
  ICareer,
  IEducation,
  IFeaturedBlog,
  IGitHub,
  IProfile,
  ITechstack,
  PROFILE,
  TECHSTACK,
} from '@frontend/connector-interfaces';
import { BehaviorSubject } from 'rxjs';
import { exhaustMap, filter, map, shareReplay, tap } from 'rxjs/operators';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly profile$ = this.request.get<[IProfile]>(PROFILE).pipe(
    map((data) => data?.[0]),
    shareReplay(1),
  );

  readonly techstack$ = this.request.get<[ITechstack]>(TECHSTACK).pipe(
    map((data) => data?.[0]),
    shareReplay(1),
  );

  readonly github$ = this.request.get<IGitHub[]>(GITHUB).pipe(
    map((data) => data?.sort((g1, g2) => g1.position - g2.position)),
    shareReplay(1),
  );

  readonly career$ = this.request.get<ICareer[]>(CAREER).pipe(shareReplay(1));

  readonly education$ = this.request.get<IEducation[]>(EDUCATION).pipe(
    map((data) => data?.sort((e1, e2) => e2.position - e1.position)),
    shareReplay(1),
  );

  readonly blog$ = this.request
    .get<IFeaturedBlog[]>(BLOG)
    .pipe(map((data) => data?.sort((b1, b2) => b1.position - b2.position)));

  private readonly aboutme$ = this.request.get<IAboutme[]>(ABOUTME).pipe(
    map((about) => about?.sort((a1, a2) => a1.position - a2.position)),
    shareReplay(1),
  );

  private loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loading.asObservable();

  private loadPage = new BehaviorSubject<'home' | 'about' | undefined | null>(null);
  readonly loadPage$ = this.loadPage.asObservable();

  readonly bio$ = this.loadPage$.pipe(
    filter((value) => value === 'home'),
    tap(() => this.toggleLoadingState(true)),
    exhaustMap(() => this.profile$),
    tap(() => this.toggleLoadingState(false)),
  );

  readonly aboutmeData$ = this.loadPage$.pipe(
    filter((value) => value === 'about'),
    tap(() => this.toggleLoadingState(true)),
    exhaustMap(() => this.aboutme$),
    tap(() => this.toggleLoadingState(false)),
  );

  constructor(private readonly request: RequestService) {}

  toggleLoadingState(state = false) {
    this.loading.next(state);
  }

  loadPageAction(action: 'home' | 'about' | undefined | null) {
    action && this.loadPage.next(action);
  }

  getWebData(url: string) {
    return this.request.web(url);
  }
}
