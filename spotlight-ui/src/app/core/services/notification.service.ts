import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationService {
  private subject = new Subject<any>();
  constructor() {}

  listen() {
    return this.subject.asObservable();
  }

  private broadcast(severity: string, summary: string, detail: string[]) {
    this.subject.next({ severity: severity, summary: summary, detail: detail });
  }

  showSuccess(summary: string, detail: string[]) {
    this.broadcast('success', summary, detail);
  }

  showInfo(summary: string, detail: string[]) {
    this.broadcast('info', summary, detail);
  }

  showWarning(summary: string, detail: string[]) {
    this.broadcast('warning', summary, detail);
  }

  showError(summary: string, detail: string[]) {
    this.broadcast('error', summary, detail);
  }
}
