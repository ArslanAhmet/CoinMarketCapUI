import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { AssetItem } from 'src/app/shared/models';
import { Router } from '@angular/router';
import { AssetDialogComponent } from './presentational/asset-dialog/asset-dialog.component';
@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  showMenu = false;
  constructor(private observer: BreakpointObserver,
    private dialog: MatDialog,
    private router: Router) { }
  open(menu: { openMenu: () => void; }) {
    menu.openMenu();
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
  createAsset() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    // dialogConfig.data = {
    //   Name: '',
    //   Email: ''
    // };

    dialogConfig.data = {
      CoinID: 1839,
      Quantity: 10,
      PricePerCoin: 100
    };

    const dialogRef = this.dialog.open(AssetDialogComponent,
      dialogConfig);

    dialogRef.afterClosed().subscribe(
      val => {
        console.log('kapatınca bu mesal geldi: ' + JSON.stringify(val));
        // this.loadKangalsPage();
        this.router.navigate(['/assets']);
      },

    );
  }
}
