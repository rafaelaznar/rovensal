import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Boss } from '../../model/pavonModel/bossInterface';
import { Weapon } from '../../model/pavonModel/weaponInterface';
import { Character } from '../../model/pavonModel/characterInterface';
import { Domain } from '../../model/pavonModel/domainInterface';

@Injectable({
  providedIn: 'root',
})
export class PavonService {
  constructor(private oHttpClient: HttpClient) {}

  getAllBosses(): Observable<Boss[]> {
    return this.oHttpClient.get<Boss[]>('https://genshin.jmp.blue/boss/weekly-boss/all');
  }

  getAllWeapons(): Observable<Weapon[]> {
    return this.oHttpClient.get<Weapon[]>('https://genshin.jmp.blue/weapons/all');
  }

  getAllCharacters(): Observable<Character[]> {
    return this.oHttpClient.get<Character[]>('https://genshin.jmp.blue/characters/all');
  }

  getAllDomains(): Observable<Domain[]> {
    return this.oHttpClient.get<Domain[]>('https://genshin.jmp.blue/domains/all');
  }
}
