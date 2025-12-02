import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/PokemonService';
import { PokemonDetailsModel } from '../../model/PokeModel';

@Component({
  selector: 'app-vista-detallada-pokemon',
  imports: [],
  templateUrl: './vistaDetalladaPokemon.html',
  styleUrl: './vistaDetalladaPokemon.css',
})
export class VistaDetalladaPokemon {
  //definimos las variables
  nombre: string | null = null;
  pokemon: PokemonDetailsModel | null = null;
  //inyectamos los servicios necesarios
  constructor(private route: ActivatedRoute, private oPokemonService: PokemonService) {
    //obtenemos el nombre del pokemon de la ruta
    this.nombre = this.route.snapshot.paramMap.get('nombre');
  }
  //al iniciar el componente obtenemos los detalles del pokemon accediendo al servicio
  ngOnInit(){
    if (this.nombre){
      this.oPokemonService.getOnePokemon(this.nombre).subscribe((pokemon) => {
        this.pokemon = pokemon;
      });
    }
  }
}
