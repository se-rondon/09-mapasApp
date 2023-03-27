import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; //Toda la librería la llamaremos mapbox-gl

interface MarcadorColor {
  color: string,
  marcador?: mapboxgl.Marker;
  centro?: [number, number];
}
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
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-3.907394017014075, 40.274853730385345];

  //Array de marcadores
  marcadores: MarcadorColor[] = [];

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.leerLocalStorage();
  }

  agregarMarcador() {

    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push({
      color, //Al ser redundante se pone así, es equivalente a color: color,
      marcador: nuevoMarcador
    });
    this.guardarLocalStorage();
    nuevoMarcador.on('dragend', () => {this.guardarLocalStorage()})
  }
  irMarcador(marcador: mapboxgl.Marker) {
    console.log(marcador);

    this.mapa.flyTo({
      center: marcador.getLngLat()
    })
  }

  guardarLocalStorage() {
    const lngLatArr: MarcadorColor[] = [];
    this.marcadores.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marcador!.getLngLat();
      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      });
    });
    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage() {
    if (!localStorage.getItem('marcadores')) {
      return;
    }
    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);
    
    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color:m.color,
        draggable: true
      })
      .setLngLat(m.centro!)
      .addTo(this.mapa);

      this.marcadores.push({
        marcador: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () => {this.guardarLocalStorage()})
    })
  }

  borrarMarcador (i: number){
    this.marcadores[i].marcador?.remove();
    this.marcadores.splice(i, 1);
    this.guardarLocalStorage();
  }
}
