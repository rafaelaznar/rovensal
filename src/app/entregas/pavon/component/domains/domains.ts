import { Component, inject } from '@angular/core';
import { Menu } from '../menu/menu';
import { RouterModule } from '@angular/router';
import { Domain } from '../../model/pavonModel/domainInterface';
import { MatDialog } from '@angular/material/dialog';
import { PavonService } from '../../service/pavonService/pavon-service';
import { DatosDominio } from '../../data/dataDomain/data';

@Component({
  selector: 'app-domains',
  imports: [RouterModule, Menu],
  templateUrl: './domains.html',
  styleUrl: './domains.css',
})
export class DomainsComponent {
  // Estas variables se inicializan antes de comenzar con las funciones, y se les da un tipo
  domains: Domain[] = [];
  readonly oMatDialog = inject(MatDialog);

  // El constructor, está vacío, pero se inyecta PavónService
  constructor(private oPavonService: PavonService) {}

  // El ngOnInit, y el método que llama para obtener los datos necesarios
  ngOnInit() {
    this.getDomains();
  }

  getDomains() {
    this.oPavonService.getAllDomains().subscribe((domains) => {
      console.log(domains);
      this.domains = domains;
    });
  }

  // Este método abre el MatDialog para mostrar los detalles
  verDetalles(dom: Domain) {
    this.oMatDialog.open(DatosDominio, {
      height: '600px',
      width: '800px',
      data: {
        domain: dom,
      },
    });
  }
}
