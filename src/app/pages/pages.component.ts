import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-pages',
  template: `
      <router-outlet></router-outlet>`,
  styles: [
  ]
})

export class PagesComponent {}
