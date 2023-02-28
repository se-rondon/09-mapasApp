import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; //Toda la librería la llamaremos mapbox-gl

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
  .mapa-container {
    height: 100%;
    width:100%;
  }
  .row{
    background-color: white;
    position:fixed;
    bottom:50px;
    left:50px;
    padding:10px;
    border-radius:5px;
    z-index: 999;
    width:400px;
  }
`
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy{

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel:number = 15;
  center: [number, number] = [-3.90729429721423, 40.27475889393171, ];


  constructor(){
  }

  // Los listener siempre hayq ue destruirlos, REGLA DE ORO
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }
  
  ngAfterViewInit():void{
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom:this.zoomLevel
    });

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel= this.mapa.getZoom();      
    });

    this.mapa.on('zoomend', (ev) => {
      if( this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18);
      }      
    });
    this.mapa.on('move', (event) => {
        const target = event.target;
        const { lng, lat } = target.getCenter();
        this.center = [lng, lat];
      
    });
  }

  zoomOut(){
    this.mapa.zoomOut();
  }
  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomCambio(valor:string){
    this.mapa.zoomTo(Number(valor));
    
  }
}
