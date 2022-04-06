import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/';

const getUserState = createFeatureSelector<State>('home');

export const getCurrentUserId = createSelector(
  getUserState,
  state => state.home.currentPersonId
);

// export const getPaginationHeader = createSelector(
//   getUserState,
//   state => state.home.paginationHeader
// );

