import { Component, inject } from '@angular/core';
import { Menu } from '../menu/menu';
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
  // Estas variables se inicializan antes de comenzar con las funciones, y se les da un tipo
  weapons: Weapon[] = [];
  readonly oMatDialog = inject(MatDialog);

  // Esta función genera la URL de la imagen deseada, es parte de la API, así que puede tardar en cargar
  imageUrlFor(weapon: Weapon) {
    const base = 'https://genshin.jmp.blue/weapons';
    const slug = weapon.id.toLowerCase().replace(/\s+/g, '-');
    return `${base}/${encodeURIComponent(slug)}/icon`;
  }

  // El constructor, está vacío, pero se inyecta PavónService
  constructor(private oPavonService: PavonService) {}

  // El ngOnInit, y el método que llama para obtener los datos necesarios
  ngOnInit() {
    this.getWeapons();
  }

  getWeapons() {
    this.oPavonService.getAllWeapons().subscribe((weapons) => {
      console.log(weapons);
      this.weapons = weapons;
    });
  }

  // Este método abre el MatDialog para mostrar los detalles
  verDetalles(weapon: Weapon) {
    this.oMatDialog.open(DatosArma, {
      height: '600px',
      width: '800px',
      data: {
        weapon: weapon,
      },
    });
  }
}
