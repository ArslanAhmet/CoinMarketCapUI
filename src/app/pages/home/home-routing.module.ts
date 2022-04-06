import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LatestAssetsComponent } from './presentational/latest-assets/latest-assets.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'assets',
  component: LatestAssetsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
