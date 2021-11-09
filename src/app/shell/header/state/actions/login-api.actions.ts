import { createAction, props } from '@ngrx/store';
import { LoginInfo } from '../../../../@shared/models/login-info';
var HEADER = '[HEADER]';
export const loginSuccess = createAction(`${HEADER} Login success`, props<{ accountInfo: LoginInfo }>());
