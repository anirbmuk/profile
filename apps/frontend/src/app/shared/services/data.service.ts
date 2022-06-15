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
import { filter, map, switchMap } from 'rxjs/operators';
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

  readonly aboutme$ = this.request.get<IAboutme[]>(ABOUTME).pipe(
    map((about) => {
      return about?.sort((a1, a2) => a1.position - a2.position);
    })
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
    switchMap(() =>
      this.education$.pipe(
        map((data) => data?.sort((e1, e2) => e2.position - e1.position))
      )
    )
  );

  readonly githubData$ = this.ghAction$.pipe(
    filter((value) => !!value),
    switchMap(() => this.github$)
  );

  readonly fetchCallback = (data: 'education' | 'github') => {
    this.fetchData(data);
  };

  private fetchData(set: 'education' | 'github') {
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

  constructor(private readonly request: RequestService) {}
}
