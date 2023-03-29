import { Component } from '@angular/core';
import { MapService } from '../../services/map.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-my-location',
  templateUrl: './my-location.component.html',
  styleUrls: ['./my-location.component.css']
})
export class MyLocationComponent {

  constructor(private placesSevice: PlacesService, private mapService: MapService){}

  public irMiLocalizacion(){
    if(!this.placesSevice.isUserLocationReady) throw new Error('No hay ubicación de usuario');
    if(!this.mapService.isMapReady) throw new Error('No se ha inicializado el mapa');
    this.mapService.flyTo(this.placesSevice.userLocation!);
    
  }
}
