import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private requestsInFlight = 0;

  show() {
    this.requestsInFlight++;
    this.loadingSubject.next(true);
  }

  hide() {
    this.requestsInFlight = Math.max(0, this.requestsInFlight - 1);
    if (this.requestsInFlight === 0) {
      this.loadingSubject.next(false);
    }
  }
}
