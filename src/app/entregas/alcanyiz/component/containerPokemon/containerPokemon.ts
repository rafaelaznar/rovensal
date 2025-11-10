import { Component, inject, Output, ViewChild } from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonDetailsModel} from '../../model/PokeModel'
import {MatDialog} from '@angular/material/dialog';
import {DialogPokemon} from '../dialogPokemon/dialogPokemon'
import {Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuTrigger } from '@angular/material/menu';


@Component({
  selector: 'app-container-pokemon',
  imports: [RouterLink, CommonModule, MatMenuModule, MatButtonModule],
  templateUrl: './containerPokemon.html',
  styleUrl: './containerPokemon.css',
})
export class ContainerPokemon {
  //le importamos el pokemon desde el componente padre
  @Input() pokemon: PokemonDetailsModel = {} as PokemonDetailsModel;

  ultimoAbierto: number = -1;
  //inyectamos el MatDialog para usar los diálogos y poder abrirlos en la misma ventana
  readonly oMatDialog = inject(MatDialog);
  //al seleccionar la vista previa de un pokemon se abre el diálogo con la información del mismo
  selectPokemon(pokemon: PokemonDetailsModel): void{
    const dialogPokemon = this.oMatDialog.open(DialogPokemon, {
      data: pokemon
    });

    dialogPokemon.afterClosed().subscribe(result => {
    this.ultimoAbierto = result?.valor;
  });
  }

  //método para abrir el menú contextual al hacer click derecho en el botón de tipos
  abrirMenu(event: MouseEvent, menu: MatMenuTrigger) {
    event.preventDefault(); // evita el menú del navegador
    menu.openMenu();
    if (menu.menu) {
      menu.menu.focusFirstItem('mouse');
    }
  }


}
