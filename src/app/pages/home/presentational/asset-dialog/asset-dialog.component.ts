import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HomePageActions } from './../../store/actions';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers/home-reducers';
import { AssetItem } from 'src/app/shared/models';


@Component({
  selector: 'app-asset-dialog',
  templateUrl: './asset-dialog.component.html',
  styleUrls: ['./asset-dialog.component.scss']
})
export class AssetDialogComponent implements OnInit {

  assetForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AssetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) { CoinID, Quantity,PricePerCoin}: AssetItem,
    private store: Store<State>) {

     }

     ngOnInit(): void {
      this.assetForm = this.fb.group({
        CoinID: ['', [Validators.required, Validators.min(0)]],
        Quantity: ['', [Validators.required, Validators.min(0)]],
        PricePerCoin: ['', [Validators.required, Validators.min(0)]],
      });

    }
    saveAsset(formValues:any) {
      let assetItem: AssetItem = {
        id: 0,
        CoinID:formValues.CoinID,
        Quantity: formValues.Quantity,
        PricePerCoin: formValues.PricePerCoin
      };
      this.store.dispatch(HomePageActions.createAsset( {payload: assetItem} ))

      this.dialogRef.close( {payload: assetItem});

    }
    dismiss() {
      this.dialogRef.close(null);
    }

}
