import { core } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PlacesResponse, Feature } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];

  public isLoadingPlaces: boolean = false;
  public places: Feature[]= [];
  
  get isUserLocationReady():boolean {
    return !!this.userLocation;
  }
  constructor(private mapService: MapService,private placesApi: PlacesApiClient) { 
    this.getUserLocation();
  }

  public getUserLocation(): Promise<[number, number]>{
    return new Promise( (resolve, reject ) =>{
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve([coords.longitude, coords.latitude])
        },
        (err => {
          alert('No se pudo obterner la geolocalización.')
          console.log(err);
          reject();
        })
      );
    })
  }

  getPlacesByQuery(query: String =''){
    
    if (query.length === 0){
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }
    if(!this.userLocation) throw new Error('No hay userLocation')

    this.isLoadingPlaces=true;

    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation?.join(',')
      }
    })
    .subscribe(resp => {
      this.isLoadingPlaces=false;
      this.places = resp.features;
      this.mapService.createMarkersFromPlaces(this.places, this.userLocation!);
    });
  }

  deletePlaces(){
    this.places=[];
  }
}
