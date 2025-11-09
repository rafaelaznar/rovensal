import { Component, inject } from '@angular/core';
import { Menu } from "../menu/menu";
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

  domains: Domain[] = []
  readonly oMatDialog = inject(MatDialog)

  constructor(private oPavonService: PavonService){ }

  ngOnInit(){
    this.getDomains();
  }

  getDomains(){
    this.oPavonService.getAllDomains().subscribe((domains) =>{
      console.log(domains)
      this.domains = domains;
    })
  }

  verDetalles(dom: Domain){
      this.oMatDialog.open(DatosDominio, {
        height: '600px',
        width: '800px',
        data: {
          domain: dom,
        }
      })
    }

}
