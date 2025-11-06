import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChampionsResponse } from '../ContrerasModel/contrerasInterface';

@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderServiceContreras {

  private apiUrl = 'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json';

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<ChampionsResponse> {
    return this.http.get<ChampionsResponse>(this.apiUrl);
  }
}