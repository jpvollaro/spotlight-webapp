// src/app/auth/token.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(event => { console.log(event); }, err => {
        if (err instanceof HttpErrorResponse && (err.status === 401)) {
          console.log(`${err.status} ERROR Caught inside ErrorInterceptor`);
          // Now we caught error, we can put logic here....
          // For some reason HttpInterceptors cannot depend on sevices that use HttpClient, causes cyclic dependency error
          this.router.navigate(['logout']);
        }
      })
    );
  }
}
