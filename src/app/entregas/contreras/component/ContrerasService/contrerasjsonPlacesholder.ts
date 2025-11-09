
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChampionsResponse } from '../ContrerasModel/contrerasInterface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderServiceContreras {
  
  constructor(private oHttpClient: HttpClient) {
  }

  getAllPosts(): Observable<ChampionsResponse> { // Por problemas de cors he utilizado un proxy
    const url = 'https://corsproxy.io/?' + encodeURIComponent('https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json');
    return this.oHttpClient.get<ChampionsResponse>(url);
  }

}