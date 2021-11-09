import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { accessToken } from '@app/shell/header/state';
import { State } from '@app/shell/header/state/header.reducer';
import { Store } from '@ngrx/store';
import { first, flatMap, mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<State>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    return this.store.select(accessToken).pipe(
      first(),
      mergeMap((token) => {
        console.log(token);
        const authReq = !!token
          ? req.clone({
              setHeaders: { Authorization: 'Bearer ' + token },
            })
          : req;
        return next.handle(authReq);
      })
    );
  }
}
