import { AfterViewInit, Component, ElementRef, ViewChild, Input } from '@angular/core';
import {Map, Popup, Marker} from 'mapbox-gl';
import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent  implements AfterViewInit{

  @ViewChild('mapDiv')
  mapDivElement?: ElementRef;
  
  constructor(private placesService: PlacesService, private mapService: MapService){}
  
  ngAfterViewInit(): void {
    if(!this.placesService.userLocation) throw Error('No hay placesService.userLocation')

    var map = new Map({
      container: this.mapDivElement?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.placesService.userLocation,
      zoom:14
    });
    
    const popup = new Popup() //Un popup se añade a un marcador
      .setHTML(`
        <h6>Aquí estoy</h6>
        <span>Estoy en este lugar del mundo</span>
      `);
    new Marker({'color': 'red'})
      .setLngLat(this.placesService.userLocation)
      .setPopup(popup)
      .addTo(map);

      this.mapService.setMap(map);
  }
}
