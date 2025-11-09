import { Component, inject } from '@angular/core';
import { Menu } from "../menu/menu";
import { RouterModule } from '@angular/router';
import { Weapon } from '../../model/pavonModel/weaponInterface';
import { PavonService } from '../../service/pavonService/pavon-service';
import { DatosArma } from '../../data/dataWeapon/data';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-weapon',
  imports: [RouterModule, Menu],
  templateUrl: './weapon.html',
  styleUrl: './weapon.css',
})
export class WeaponsComponent {

  weapons: Weapon[] = [];
   readonly oMatDialog = inject(MatDialog)

   imageUrlFor(weapon: Weapon) {
       const base = 'https://genshin.jmp.blue/weapons';
       const slug = (weapon.id).toLowerCase().replace(/\s+/g, '-');
       return `${base}/${encodeURIComponent(slug)}/icon`;
     }


  constructor(private oPavonService: PavonService){  }

  ngOnInit(){
    this.getWeapons();
  }

  getWeapons(){
       this.oPavonService.getAllWeapons().subscribe((weapons) => {
        console.log(weapons)
        this.weapons = weapons;
       })
  }

  verDetalles(weapon: Weapon){
      this.oMatDialog.open(DatosArma, {
        height: '600px',
        width: '800px',
        data: {
          weapon: weapon,
        }
      })
    }

}
