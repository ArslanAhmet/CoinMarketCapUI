import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';

import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';

import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    RouterModule
  ]
})
export class PagesModule { }
