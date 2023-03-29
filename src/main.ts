import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// import mapboxgl from 'mapbox-gl';

// mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZGoiLCJhIjoiY2xlbWppNnB4MDl5bTNyb2ZrN3FzangxayJ9.iRiV7qeZphcvCOLFPek5nA';

if(!navigator.geolocation){
  alert('Navegador no soporta la geolocalizacion.');
  throw new Error('Navegador no soporta la geolocalizacion.');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
