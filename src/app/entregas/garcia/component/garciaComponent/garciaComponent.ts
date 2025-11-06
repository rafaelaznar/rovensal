import { Component } from '@angular/core';
import { Character, CharacterResponse } from '../../model/apiInterface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-garcia',
  imports: [],
  templateUrl: './garciaComponent.html',
  styleUrl: './garciaComponent.css',
  standalone: true,
})
export class GarciaComponent {

  //INICIAR COMBATE:
  startCombat() {
    console.log('Combate iniciado');
  }

  //ELEGIR PERSONAJE:
  selectMan() {
    const characterPresetImage = document.getElementById(
      'personajeMasc.png'
    ) as HTMLImageElement;
    characterPresetImage.src = '../../imagenes/personajeMasc.png';
  }

  selectWoman() {
    //poner la imagen del personaje femenino
    const characterPresetImage = document.getElementById(
      'characterPresetImage'
    ) as HTMLImageElement;
    characterPresetImage.src = '../../imagenes/personajeFem.png';
  }

  //API:
  personajes: Character[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    const url =
      'https://corsproxy.io/?' +
      encodeURIComponent('https://www.demonslayer-api.com/api/v1/characters');

    this.http.get<CharacterResponse>(url).subscribe({
      next: (response: CharacterResponse) => {
        console.log(response);
        this.personajes = response.content;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
  // ATRIBUTOS HUMANOS:
  endCombat() {
    console.log('Combate finalizado');
  }
}
