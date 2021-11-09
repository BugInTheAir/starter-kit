import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AccountInfo, EventMessage, EventType } from '@azure/msal-browser';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isLoggedIn, userFullName, userName } from './header/state';
import { loginSuccess } from './header/state/actions/login-api.actions';
import { HeaderState } from './header/state/header.reducer';
import { LoginInfo } from '../@shared/models/login-info';
import { FileState } from '@app/file-explorer/store/file.reducer';
import { PathTracer } from '@app/@shared/models/PathTracer';
import { Stack } from 'stack-typescript';
import { currentFolder, getPathTracer } from '@app/file-explorer/store';
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  constructor(
    private store: Store<HeaderState>,
    private storeFile: Store<FileState>,
    private msalBroadcastService: MsalBroadcastService,
    private authService: MsalService
  ) {}
  private readonly _destroying$ = new Subject<void>();
  loginDisplay = false;
  isLoggedIn$: Observable<boolean> | undefined;
  userFullName$: Observable<string> | undefined;
  userName$: Observable<string> | undefined;
  stack$: Observable<Stack<PathTracer>> | undefined;
  ngOnInit() {
    this.isLoggedIn$ = this.store.select(isLoggedIn);
    this.userFullName$ = this.store.select(userFullName);
    this.userName$ = this.store.select(userName);
    this.stack$ = this.store.select(getPathTracer);
    this.stack$.subscribe((data) => {
      console.log(data);
    });
    this.store.select(currentFolder).subscribe((data) => {
      console.log(data);
    });
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        )
      )
      .subscribe((result) => {
        if (result.payload) {
          let payload = result.payload as unknown as LoginInfo;
          this.store.dispatch(loginSuccess({ accountInfo: payload }));
        }
      });
  }

  login() {
    this.authService.loginRedirect();
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  ngOnDestroy() {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
