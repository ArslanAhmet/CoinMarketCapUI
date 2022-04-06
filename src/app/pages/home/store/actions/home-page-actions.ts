import { createAction, props } from '@ngrx/store';
import { AssetItem, PersonItem } from '../../../../shared/models';

export const createPerson = createAction(
  '[Persons PAGE] CREATE_PERSON',
  props<{ payload: PersonItem }>(),
);

export const createAsset = createAction(
  '[Assets PAGE] CREATE_ASSET',
  props<{ payload: AssetItem }>(),
);

export const setPaginationHeader = createAction(
  '[Persons PAGE] Set Pagination Header',
  props<{ payload: string }>(),
);
