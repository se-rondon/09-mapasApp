import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { DirectionsApiClient } from '../api/directionsApiClient';
import { DirectionsResponse, Route } from '../interfaces/directions';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;
  private markers: Marker[] = [];

  constructor(private directionApiClient: DirectionsApiClient){}

  get isMapReady(): boolean{
    return !!this.map;
  }

  setMap(map: Map){
    this.map = map;
  }

  
  flyTo(coords: LngLatLike){
    if(!this.isMapReady) throw new Error('El mapa no está inicializado');

    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]){
    if(!this.map) throw new Error('Mapa no inicializado.');
    

    this.markers.forEach(marker => marker.remove()); //Esto lo borra del mapa pero sigue en mi array
    const newMarkers = [];
    
    for(const place of places){
      const [lng, lat] = place.center;
      const popup = new Popup()
        .setHTML(`
          <h6>${ place.text}</h6>
          <span>${place.place_name}</span>
        `);
        const newMarker = new Marker()
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(this.map);

        newMarkers.push(newMarker);
    }
    this.markers = newMarkers;

    if(places.length === 0 ) return;
    //Limites del mapa
    const bounds = new LngLatBounds();
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()))

    bounds.extend(userLocation);
    this.map.fitBounds(bounds, {
       padding:200,
    });
  }

  getRouteBetweenToPoints(start: [number, number], end: [number, number]){
    this.directionApiClient.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe( resp => this.drawPolyline(resp.routes[0]));
  }

  private drawPolyline(route: Route){
    console.log({kms: route.distance / 1000, duration: route.duration});

    if (!this.map) throw Error('Mapa no inicializado');
    
    const coords = route.geometry.coordinates;
    const bounds = new LngLatBounds();

    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    this.map?.fitBounds(bounds, {
      padding:200
    });

    //Polyline. Esto viene en la documentación de mapbox
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type:'LineString',
              coordinates:coords
            }
          }
        ]
      }
    }

//Comrpobar si existe ruta anterior y limparla
if(this.map.getLayer('RouteString')){
  this.map.removeLayer('RouteString');
  this.map.removeSource('RouteString');
  
}

    this.map.addSource('RouteString', sourceData);
    this.map.addLayer({
      id: 'RouteString', // este no es necesario que coincida con el id del source pero se recomienda
      type:'line',
      source: 'RouteString', // Este debe coincidir con el id del source
      layout: {
        'line-cap':'round', //inicio y fin: redondeados
        'line-join': 'round' //Van con '' porque javascript no admite el guión como literales
      },
      paint: {
        'line-color': 'blue',
        'line-width': 3
      }
    })
  }
} 