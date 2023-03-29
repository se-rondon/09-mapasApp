import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  private debounceTimer?: NodeJS.Timeout;
  
  constructor(private placesService: PlacesService){}

  onQueryChanged(query: String = ''){ //Inicializo el string a vacio
    if(this.debounceTimer) clearTimeout(this.debounceTimer) //Si tengo un valor lo limpioç

    this.debounceTimer = setTimeout( () => {
      this.placesService.getPlacesByQuery(query);
      
    }, 500)
    
  }
}
