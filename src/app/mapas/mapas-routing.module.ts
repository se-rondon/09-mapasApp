import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullScreenComponent } from './components/full-screen/full-screen.component';
import { MarcadoresComponent } from './components/marcadores/marcadores.component';
import { PropiedadesComponent } from './components/propiedades/propiedades.component';
import { ZoomRangeComponent } from './components/zoom-range/zoom-range.component';
import { RutasComponent } from '../rutas/rutas.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'full-screen', component:FullScreenComponent },
      {path:'zoom-range', component:ZoomRangeComponent },
      {path:'marcadores', component:MarcadoresComponent },
      {path:'propiedades', component:PropiedadesComponent },
      {path:'rutas', component:RutasComponent },
      {path:'**', redirectTo:'full-screen' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
