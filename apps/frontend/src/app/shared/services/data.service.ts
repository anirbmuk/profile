import { Injectable } from '@angular/core';
import {
  ABOUTME,
  CAREER,
  EDUCATION,
  GITHUB,
  IAboutme,
  ICareer,
  IEducation,
  IGitHub,
  IProfile,
  ITechstack,
  PROFILE,
  TECHSTACK,
} from '@frontend/connector-interfaces';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ImpressionSections } from '../types';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly profile$ = this.request.get<[IProfile]>(PROFILE);
  readonly techstack$ = this.request.get<[ITechstack]>(TECHSTACK);
  readonly github$ = this.request.get<IGitHub[]>(GITHUB);
  readonly career$ = this.request.get<ICareer[]>(CAREER);
  readonly education$ = this.request.get<IEducation[]>(EDUCATION);

  private loaders: ('github' | 'education')[] = [];

  private loading = new BehaviorSubject<{ source: ('github' | 'education')[] }>(
    { source: [] },
  );

  readonly ghLoading$ = this.loading
    .asObservable()
    .pipe(map((value) => value.source?.includes('github')));

  readonly edLoading$ = this.loading
    .asObservable()
    .pipe(map((value) => value.source?.includes('education')));

  readonly aboutme$ = this.request.get<IAboutme[]>(ABOUTME).pipe(
    map((about) => {
      return about?.sort((a1, a2) => a1.position - a2.position);
    }),
  );

  readonly bio$ = forkJoin<[IProfile], [ITechstack], ICareer[]>([
    this.profile$,
    this.techstack$,
    this.career$,
  ]);

  private edActionS = new BehaviorSubject<string | undefined>('');
  private edAction$ = this.edActionS.asObservable();

  private ghActionS = new BehaviorSubject<string | undefined>('');
  private ghAction$ = this.ghActionS.asObservable();

  readonly educationData$ = this.edAction$.pipe(
    filter((value) => !!value),
    tap(() => this.toggleLoading('show', 'education')),
    switchMap(() =>
      this.education$.pipe(
        map((data) => data?.sort((e1, e2) => e2.position - e1.position)),
        tap(() => this.toggleLoading('hide', 'education')),
      ),
    ),
  );

  readonly githubData$ = this.ghAction$.pipe(
    filter((value) => !!value),
    tap(() => this.toggleLoading('show', 'github')),
    switchMap(() =>
      this.github$.pipe(
        map((data) => data?.sort((g1, g2) => g1.position - g2.position)),
        tap(() => this.toggleLoading('hide', 'github')),
      ),
    ),
  );

  readonly fetchCallback = (data: ImpressionSections) => {
    this.fetchData(data);
  };

  private fetchData(set: ImpressionSections) {
    switch (set) {
      case 'education':
        this.edActionS.next(set);
        break;
      case 'github':
        this.ghActionS.next(set);
        break;
      default:
        undefined;
    }
  }

  private toggleLoading(
    action: 'show' | 'hide',
    section: 'github' | 'education',
  ) {
    if (action === 'show') {
      this.loaders = [...this.loaders, section];
    } else {
      const index = this.loaders.findIndex((each) => each === section);
      index > -1 && this.loaders.splice(index, 1);
    }
    this.loading.next({ source: this.loaders });
  }

  constructor(private readonly request: RequestService) {}
}
