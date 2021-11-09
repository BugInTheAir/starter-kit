import { createAction } from '@ngrx/store';

var HEADER = '[HEADER]';
export const login = createAction(`${HEADER} Login`);
