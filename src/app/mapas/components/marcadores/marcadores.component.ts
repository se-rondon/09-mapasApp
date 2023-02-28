import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; //Toda la librería la llamaremos mapbox-gl
@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
    .mapa-container {
    height: 100%;
    width:100%;
  }

  .list-group {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index:99
  }

  li{
    cursor:pointer
  }
  `
  ]
})
export class MarcadoresComponent implements AfterViewInit{
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel:number = 15;
  center: [number, number] = [-3.907394017014075, 40.274853730385345];
  
  marcadores = [{
    color:'',
    marker: new mapboxgl.Marker()
  }];
  ngAfterViewInit():void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom:this.zoomLevel
    })
    

  
  }

  agregarMarcador(){
    
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const nuevoMarcador = new mapboxgl.Marker({
      draggable:true,
      color
    })
    .setLngLat(this.center)
    .addTo(this.mapa);
    console.log(nuevoMarcador.getLngLat());
    
  }
  irMarcador(){}
}
