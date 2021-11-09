import { LoginInfo } from '@app/@shared/models/login-info';
import { initData } from '@app/file-explorer/store/actions/file-page.actions';
import { createReducer, on } from '@ngrx/store';
import * as AppState from '../../../state/state';
import { loginSuccess } from './actions/login-api.actions';
export interface State extends AppState.State {
  header: HeaderState;
}

export interface HeaderState {
  isLoggedIn: boolean;
  logginInfo: LoginInfo;
}

const initialState: HeaderState = {
  isLoggedIn: false,
  logginInfo: {
    accessToken: '',
    account: {
      username: '',
      name: '',
      localAccountId: '',
    },
    scopes: [],
    idToken: '',
    uniqueId: '',
  },
};

export function headerReducer(state: any, action: any) {
  return _headerReducer(state, action);
}

const _headerReducer = createReducer<HeaderState>(
  initialState,
  on(loginSuccess, (state, payload): HeaderState => {
    return {
      ...state,
      isLoggedIn: true,
      logginInfo: payload.accountInfo,
    };
  })
);
