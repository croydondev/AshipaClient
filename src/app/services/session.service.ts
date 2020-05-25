import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private subject = new Subject<any>();

  sendMessage(message: string, username: string) {
      this.subject.next({ text: message, username: username });
  }

  clearMessages() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

  constructor() { }
}
