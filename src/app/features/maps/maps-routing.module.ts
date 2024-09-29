import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GmapsComponent } from './components/gmaps/gmaps.component';
import { MapsComponent } from './maps.component';

const routes: Routes = [
  {
    path: '',
    component: MapsComponent,
    children: [
      { path: '', component: GmapsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
