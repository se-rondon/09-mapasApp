import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { FullScreenComponent } from './components/full-screen/full-screen.component';
import { MiniMapaComponent } from './components/mini-mapa/mini-mapa.component';
import { MarcadoresComponent } from './components/marcadores/marcadores.component';
import { PropiedadesComponent } from './components/propiedades/propiedades.component';
import { ZoomRangeComponent } from './components/zoom-range/zoom-range.component';


@NgModule({
  declarations: [
    FullScreenComponent,
    MiniMapaComponent,
    MarcadoresComponent,
    PropiedadesComponent,
    ZoomRangeComponent
  ],
  imports: [
    CommonModule,
    MapasRoutingModule
  ]
})
export class MapasModule { }
