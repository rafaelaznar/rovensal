import { Component } from "@angular/core";
import { SalinasCharacterCardComponent } from "../salinasCharacterCard/salinasCharacterCard";
import { RmPersonaje } from "../../model/salinasInterface";
import { SalinasService } from "../../service/salinasService";
import { SalinasNavbarUnroutedComponent } from "../salinasNavbarUnrouted/salinasNavbarUnrouted";



@Component ({
    selector: 'app-salinasListCharacter',
    imports: [SalinasCharacterCardComponent, SalinasNavbarUnroutedComponent],
    templateUrl: './salinasListCharacter.html',
    styleUrl: './salinasListCharacter.css',
})
export class salinasListCharacter {
    personajes: RmPersonaje[] = [];
    error = '';
    constructor (private salinasService : SalinasService) {

    }

    ngOnInit() {
        this.salinasService.getPersonajes().subscribe({
      next: (personajes) => (this.personajes = personajes),
      error: (err) => {
        console.error('Error cargando personajes', err);
        this.error = 'Error cargando personajes';
      }
    });
    }




}