import { Component } from '@angular/core';
import { PavonService } from '../../service/pavonService/pavon-service';
import { Character } from '../../model/pavonModel/characterInterface';
import { Boss } from '../../model/pavonModel/bossInterface';
import { Weapon } from '../../model/pavonModel/weaponInterface';
import { Domain } from '../../model/pavonModel/domainInterface';
import { Menu } from "../menu/menu";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-pavon',
  imports: [Menu, RouterOutlet, RouterModule],
  templateUrl: './pavonComponent.html',
  styleUrl: './pavonComponent.css',
  standalone: true,
})
export class PavonComponent {
  chacacters: Character[] = [];
  bosses: Boss[] = [];
  weapons: Weapon[] = [];
  domains: Domain[] = [];

  constructor(private pavonService: PavonService) {}

  ngOnInit() {
    this.getChars();
    this.getWeapons();
    this.getBosses();
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
  getDomains() {
    this.pavonService.getAllDomains().subscribe((domainsData) => {
      console.log(domainsData);
      this.domains = domainsData;
    });
  }
}
