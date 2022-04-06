import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HomePageActions, PersonApiActions } from './../actions';
import { PersonItemService } from 'src/app/@core/data-services';

@Injectable()
export class HomeEffects {

  constructor(private actions$: Actions, private personService: PersonItemService) { }

  createPerson$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(HomePageActions.createPerson),
        concatMap(action =>

          this.personService.createPersonItem(action.payload)
            .pipe(
              map(person => PersonApiActions.createPersonSuccess({ payload: person })),
              catchError(error => of(PersonApiActions.createPersonFailure({ error })))
            )
        )
      );
  });

  createAsset$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(HomePageActions.createAsset),
        concatMap(action =>

          this.personService.createAssetItem(action.payload)
            .pipe(
              map(person => PersonApiActions.createAssetSuccess({ payload: person })),
              catchError(error => of(PersonApiActions.createAssetFailure({ error })))
            )
        )
      );
  });


}
