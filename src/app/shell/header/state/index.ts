import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HeaderState } from './header.reducer';

const getHeaderState = createFeatureSelector<HeaderState>('header');

export const isLoggedIn = createSelector(getHeaderState, (state) => state.isLoggedIn);
export const userName = createSelector(getHeaderState, (state) => state.logginInfo.account.username);
export const userFullName = createSelector(getHeaderState, (state) => state.logginInfo.account.name);
export const accessToken = createSelector(getHeaderState, (state) => state.logginInfo.accessToken);
