import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertEventService {
  private response = new Subject<boolean>();

  response$ = this.response.asObservable();

  userResponse(value: boolean): void {
    this.response.next(value);
  }
}
