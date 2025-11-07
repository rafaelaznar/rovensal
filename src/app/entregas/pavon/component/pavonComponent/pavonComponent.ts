import { Component } from '@angular/core';
import { PavonService } from '../../service/pavonService/pavon-service';
import { Character } from '../../model/pavonModel/characterInterface';
import { Boss } from '../../model/pavonModel/bossInterface';
import { Weapon } from '../../model/pavonModel/weaponInterface';
import { Domain } from '../../model/pavonModel/domainInterface';

@Component({
  selector: 'app-pavon',
  imports: [],
  templateUrl: './pavonComponent.html',
  styleUrl: './pavonComponent.css',
  standalone: true,
})
export class PavonComponent {
  chacacters: Character[] = [];
  bosses: Boss[] = [];
  weapons: Weapon[] = [];
  elements: Element[] = [];
  domains: Domain[] = [];

  constructor(private pavonService: PavonService) {}

  ngOnInit() {
    this.getChars();
    this.getWeapons();
    this.getBosses();
    this.getElements();
    this.getDomains();
  }

  getChars() {
    this.pavonService.getAllCharacters().subscribe((charactersData) => {
      console.log(charactersData);
      this.chacacters = charactersData;
    });
  }
  getWeapons() {
    this.pavonService.getAllWeapons().subscribe((weaponsData) => {
      console.log(weaponsData);
      this.weapons = weaponsData;
    });
  }
  getBosses() {
    this.pavonService.getAllBosses().subscribe((bossesData) => {
      console.log(bossesData);
      this.bosses = bossesData;
    });
  }
  getElements() {
    this.pavonService.getAllElements().subscribe((elementsData) => {
      console.log(elementsData);
      this.elements = elementsData;
    });
  }
  getDomains() {
    this.pavonService.getAllDomains().subscribe((domainsData) => {
      console.log(domainsData);
      this.domains = domainsData;
    });
  }
}
