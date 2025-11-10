import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Castanyera } from '../model/castanyeraInterface';

@Injectable({
  providedIn: 'root',
})
export class Jsonplacecastanyera {
  constructor(private oHttpClient: HttpClient) {}

  //conseguir array con todos los personajes
  getAllCharacters(): Observable<Castanyera[]> {
    return this.oHttpClient
      .get<any>('https://api.disneyapi.dev/character/:id?=page=1&pageSize=6500').pipe(
        map((res) => res.data as Castanyera[]),
      map((characters: Castanyera[]) =>
        characters.filter((char) =>
          (char.films && char.films.length > 0) ||
          (char.tvShows && char.tvShows.length > 0)
        )
      )
    );
  }

  //conseguir personaje segun id
  getCharacterById(id: number): Observable<Castanyera> {
    return this.oHttpClient.get<Castanyera>(
      `https://api.disneyapi.dev/character/${id}`
    );
  }

  //conseguir personajes segun nombre
  getCharactersByName(name: string): Observable<Castanyera[]> {
    return this.oHttpClient
      .get<any>(`https://api.disneyapi.dev/character?name=${name}`).pipe(
        map((res) => res.data as Castanyera[])
      );
  }


}
