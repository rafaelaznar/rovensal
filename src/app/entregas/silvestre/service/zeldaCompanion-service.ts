import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ZeldaCompanion } from '../model/zeldaCompanionInterface';

@Injectable({ providedIn: 'root' })
export class ZeldaCompanionService {
  private companions: ZeldaCompanion[] = [
    { id: 'Comunidad de Hyrule', name: 'Navi', region: 'Great Plateau', description: 'Familiar and guiding spirit' },
    { id: 'Comunidad de Zora', name: 'Mipha', region: 'Zora Domain', description: 'Graceful and caring' },
    { id: 'Comunidad de Goron', name: 'Daruk', region: 'Goron City', description: 'Strong protector' },
    { id: 'Comunidad de Rito', name: 'Revali', region: 'Rito Village', description: 'Skilled archer and flyer' },
    { id: 'Comunidad de Gerudo', name: 'Urbosa', region: 'Gerudo Desert', description: 'Fierce warrior and leader' },
    { id: 'Comunidad de la Espada Maestra', name: 'Fi', region: 'Temple of Time', description: 'Spirit of the Master Sword' },
    { id: 'Comunidad de Minish', name: 'Ezlo', region: 'Minish Village', description: 'Wise and witty hat companion' },
    { id: 'Comunidad de la Luz', name: 'Midna', region: 'Twilight Realm', description: 'Mysterious and powerful ally' },
    { id: 'Comunidad de la Reloj', name: 'Tatl', region: 'Clock Town', description: 'Spunky fairy companion' },
    { id: 'Comunidad de los Cielos', name: 'Ciela', region: 'Skyloft', description: 'Loyal Loftwing bird' },
  ];

  constructor() {}

  getAllCompanions(): Observable<ZeldaCompanion[]> {
    return of(this.companions);
  }
}
