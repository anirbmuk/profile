import { Injectable } from '@angular/core';
import {
  EDUCATION,
  GITHUB,
  IEducation,
  IGitHub,
  IProfile,
  ITechstack,
  PROFILE,
  TECHSTACK,
} from '@frontend/connector-interfaces';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { RequestService } from '.';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly profile$ = this.request.get<[IProfile]>(PROFILE);
  readonly techstack$ = this.request.get<[ITechstack]>(TECHSTACK);
  readonly github$ = this.request.get<IGitHub[]>(GITHUB);
  readonly education$ = this.request.get<IEducation[]>(EDUCATION);

  readonly bio$ = forkJoin<[IProfile], [ITechstack], IGitHub[]>([
    this.profile$,
    this.techstack$,
    this.github$,
  ]);

  private edActionS = new BehaviorSubject<string | undefined>('');
  private edAction$ = this.edActionS.asObservable();

  readonly educationData$ = this.edAction$.pipe(
    filter((value) => !!value),
    switchMap(() =>
      this.education$.pipe(
        map((data) => data?.sort((e1, e2) => e2.position - e1.position))
      )
    )
  );

  readonly fetchCallback = (data: 'education') => {
    this.fetchData(data);
  };
  readonly callback = (message: string) => console.log(message);

  private fetchData(set: 'education') {
    set === 'education' ? this.edActionS.next(set) : undefined;
  }

  constructor(private readonly request: RequestService) {}
}
