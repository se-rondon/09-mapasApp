import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; //Toda la librería la llamaremos mapbox-gl

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
    #mapa {
      height: 100%;
      width:100%;
    }
  `
  ]
})


export class FullScreenComponent implements OnInit {

  ngOnInit():void{
    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center:[-3.90729429721423, 40.27475889393171, ],
      zoom:15
    });
  }
}