import { Component, inject } from '@angular/core';
import { Dino } from '../../model/dinoInterface';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Componente de diálogo para seleccionar un dinosaurio favorito.
 * Se abre como ventana emergente (MatDialog) desde el menú.
 * Muestra la lista completa de dinosaurios y permite seleccionar uno.
 */
@Component({
  selector: 'app-dino-selector',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './dino-selector.html',
  styleUrl: './dino-selector.css',
})
export class DinoSelector {
  /** Lista de dinosaurios disponibles para seleccionar */
  dinos: Dino[] = [];
  
  /** Dinosaurio actualmente seleccionado por el usuario */
  dinoSelected: Dino | null = null;
  
  /** Referencia al diálogo para cerrarlo y devolver datos */
  readonly oDialog = inject(MatDialogRef<DinoSelector>);
  
  /** Datos recibidos desde el componente que abrió el diálogo */
  readonly data = inject(MAT_DIALOG_DATA);

  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Carga los dinosaurios desde los datos recibidos.
   */
  ngOnInit() {
    // Usar los dinosaurios pasados desde el componente padre
    if (this.data && this.data.dinosaurios) {
      this.dinos = this.data.dinosaurios;
    }
  }

  /**
   * Selecciona un dinosaurio y cierra el diálogo devolviendo el dinosaurio seleccionado.
   * @param dino - El dinosaurio seleccionado por el usuario
   * @returns void - Cierra el diálogo con el dinosaurio como resultado
   * @example
   * selectDino(trex);
   * // El diálogo se cierra y devuelve el T-Rex al componente padre
   */
  selectDino(dino: Dino) {
    this.dinoSelected = dino;
    this.oDialog.close(this.dinoSelected);
  }

  /**
   * Cierra el diálogo sin seleccionar ningún dinosaurio.
   * @returns void
   */
  cerrar() {
    this.oDialog.close();
  }
}
