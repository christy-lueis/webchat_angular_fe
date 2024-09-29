import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.scss']
})
export class GmapsComponent {
  apiLoaded: Observable<boolean>;
  options: google.maps.MapOptions = {
    center: {lat: 40, lng: -20},
    zoom: 4
  };
  
zoom = 4;
  constructor()
  {

  }
  ngOnInit()  {
    this.getLocation()
  }
   getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position=>{
        console.log(position);
        
      });
    } else {
    }
  }
}
  
  
