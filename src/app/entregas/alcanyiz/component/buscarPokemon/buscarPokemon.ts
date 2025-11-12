
import { PokemonService } from './../../services/PokemonService';
import { Component } from '@angular/core';
import {PokemonDetailsModel} from '../../model/PokeModel'
import {ContainerPokemon} from '../containerPokemon/containerPokemon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'app-buscar-pokemon',
  imports: [ContainerPokemon, ReactiveFormsModule],
  templateUrl: './buscarPokemon.html',
  styleUrl: './buscarPokemon.css',
})
export class BuscarPokemon {
  //definimos las variables
  form: FormGroup;
  pokemon: PokemonDetailsModel | null = null;
  equipoPokemon: PokemonDetailsModel[] = [];
  @Input() trainerName: string = '';

  //inyectamos el servicio y el formbuilder
  constructor(private oPokemonService: PokemonService, private fb: FormBuilder) {
    //inicializamos el formulario reactivo con validaciones de required y expresion regular
    this.form = this.fb.group({
      search: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ1-9\\s-+]+$'), Validators.minLength(1), Validators.maxLength(30), Validators.nullValidator]]
    });
  }

  ngOnInit(){

  }
  //metodo para buscar pokemon
  buscarPokemon(): void {
  //obtenemos el valor del input
  const nombre = this.form.value.search;
      console.log("Buscando pokemon: " + nombre);
      //llamamos al servicio para obtener el pokemon
      this.oPokemonService.getOnePokemon(nombre).subscribe({
        next: (pokemon: PokemonDetailsModel | null) => {
          //si el pokemon no existe mostramos mensaje de error
          if (!pokemon) {
            document.getElementById('mensajeError')!.innerText = 'Pokémon no encontrado.';
            this.pokemon = null;
            return;
          }
          //si existe lo asignamos a la variable pokemon
          this.pokemon = pokemon;
          document.getElementById('mensajeError')!.innerText = '';
        },
        error: (error) => {
          console.error('Error fetching Pokémon:', error);
          this.pokemon = null;
        }
      });
  }
  //metodo para añadir pokemon al equipo al pulsar el boton
  anadirAEquipo(pokemon: PokemonDetailsModel): void {
    //llamamos al servicio para añadir el pokemon al equipo
    const added = this.oPokemonService.savePokemonToEquipo(pokemon);
    //si se añade correctamente actualizamos el equipo
    if (added) {
      this.equipoPokemon = this.oPokemonService.equipoPokemon();
    } else {
      console.log('No se pudo añadir al equipo: ya existe o equipo lleno');
    }
  }
  //metodo para eliminar pokemon del equipo al pulsar el boton
  eliminarDelEquipo(pokemon: PokemonDetailsModel): void {
    //llamamos al servicio para eliminar el pokemon del equipo
    const removed = this.oPokemonService.removePokemonFromEquipo(pokemon.id);
    //si se elimina correctamente actualizamos el equipo
    if (removed) {
      this.equipoPokemon = this.oPokemonService.equipoPokemon();
    } else {
      console.warn('No se pudo eliminar del equipo: no encontrado');
    }
  }
}
