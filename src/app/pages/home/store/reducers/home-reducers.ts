import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { PersonApiActions, HomePageActions } from './../actions';
import { PersonItem } from '../../../../shared/models';
import * as AppState from '../../../../state/app.state';

export interface State extends AppState.State {
  home: HomeReducerState;
}
export interface HomeReducerState {
  currentPersonId: number | null;
  // paginationHeader: string;
  error: string;
}

export const initialState: HomeReducerState = {
  currentPersonId: null,
  // paginationHeader: '',
  error: '',
};

const homeReducerInternal = createReducer<HomeReducerState>(
  initialState,
  // After a create, the currentPerson is the new Person.
  on(PersonApiActions.createPersonSuccess, (state, action): HomeReducerState => {
    return {
      ...state,
      currentPersonId: action.payload.id,
      error: ''
    };
  }),
  on(PersonApiActions.createPersonFailure, (state, action): HomeReducerState => {
    return {
      ...state,
      error: action.error
    };
  }),

);

export function personReducer(
  state: HomeReducerState | undefined,
  action: Action
) {
  return homeReducerInternal(state, action);
}

