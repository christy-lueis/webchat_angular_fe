import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { GmapsComponent } from './components/gmaps/gmaps.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { MapsComponent } from './maps.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    GmapsComponent,
    MapsComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    GoogleMapsModule ,
    SharedModule
  ]
})
export class MapsModule { }
