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

  bosses: Boss[] = [];
  readonly oMatDialog = inject(MatDialog)

  imageUrlFor(boss: Boss) {
    const base = 'https://genshin.jmp.blue/boss/weekly-boss';
    const slug = (boss.id).toLowerCase().replace(/\s+/g, '-');
    return `${base}/${encodeURIComponent(slug)}/portrait`;
  }

  constructor(private oPavonService: PavonService){ }

  ngOnInit(){
    this.getBosses();
  }

  getBosses(){
    this.oPavonService.getAllBosses().subscribe((bosses) => {
      console.log(bosses)
      this.bosses = bosses;
    })
  }

  verDetalles(boss: Boss){
    this.oMatDialog.open(DatosJefe, {
      height: '600px',
      width: '800px',
      data: {
        boss: boss,
      }
    })
  }


}
