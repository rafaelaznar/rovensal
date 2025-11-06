import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Castanyera } from '../model/castanyeraInterface';
 
@Injectable({
  providedIn: 'root',
})
export class Jsonplacecastanyera {
  constructor(private oHttpClient: HttpClient) {}

  getAllAlbums(): Observable<Castanyera[]> {
    return this.oHttpClient.get<Castanyera[]>('https://api.disneyapi.dev/character');
  }
}