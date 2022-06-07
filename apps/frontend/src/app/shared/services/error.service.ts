import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IError } from '../../error';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<IError | null>(null);
  error$ = this.errorSubject.asObservable();

  addError(error: IError): void {
    if (error) {
      this.errorSubject.next(error);
    }
  }
}
