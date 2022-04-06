import { createAction, props } from '@ngrx/store';
import { AssetItem, ModelDescriptor, PersonItem } from '../../../../shared/models';

export const createPersonSuccess = createAction(
  '[Persons API] CREATE_PERSON_SUCCESS',
  props<{ payload: PersonItem }>(),
);

export const createAssetSuccess = createAction(
  '[Assets API] CREATE_Asset_SUCCESS',
  props<{ payload: AssetItem }>(),
);

export const createPersonFailure = createAction(
  '[Person API] Create Person Fail',
  props<{ error: string }>()
);

export const createAssetFailure = createAction(
  '[Asset API] Create Asset Fail',
  props<{ error: string }>()
);
