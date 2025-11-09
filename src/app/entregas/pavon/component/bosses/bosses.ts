import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from '../menu/menu';
import { Boss } from '../../model/pavonModel/bossInterface';
import { MatDialog } from '@angular/material/dialog';
import { PavonService } from '../../service/pavonService/pavon-service';
import { DatosJefe } from '../../data/dataBoss/data';

@Component({
  selector: 'app-bosses',
  imports: [RouterModule, Menu],
  templateUrl: './bosses.html',
  styleUrl: './bosses.css',
})
export class BossesComponent {
  // Estas variables se inicializan antes de comenzar con las funciones, y se les da un tipo
  bosses: Boss[] = [];
  readonly oMatDialog = inject(MatDialog);

  // Esta función genera la URL de la imagen deseada, es parte de la API, así que puede tardar en cargar
  imageUrlFor(boss: Boss) {
    const base = 'https://genshin.jmp.blue/boss/weekly-boss';
    const slug = boss.id.toLowerCase().replace(/\s+/g, '-');
    return `${base}/${encodeURIComponent(slug)}/portrait`;
  }

  // El constructor, está vacío, pero se inyecta PavónService
  constructor(private oPavonService: PavonService) {}

  // El ngOnInit, y el método que llama para obtener los datos necesarios
  ngOnInit() {
    this.getBosses();
  }

  getBosses() {
    this.oPavonService.getAllBosses().subscribe((bosses) => {
      console.log(bosses);
      this.bosses = bosses;
    });
  }

  // Este método abre el MatDialog para mostrar los detalles
  verDetalles(boss: Boss) {
    this.oMatDialog.open(DatosJefe, {
      height: '600px',
      width: '800px',
      data: {
        boss: boss,
      },
    });
  }
}
