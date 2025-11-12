import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BarraVidaComponent } from '../barra-vida/barra-vida';
import { BotonesAccionComponent } from '../botones-accion/botones-accion';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion';
import { GarciaService } from '../../service/garcia-service';
import { Menu } from "../menu/menu";

@Component({
  selector: 'app-garcia',
  standalone: true,
  imports: [CommonModule, FormsModule, BarraVidaComponent, BotonesAccionComponent, Menu],
  templateUrl: './garciaComponent.html',
  styleUrls: ['./garciaComponent.css']
})
export class GarciaComponent{
  imagenHombre = '/garcia/imagenes/personajeMasc.png';
  imagenMujer = '/garcia/imagenes/personajeFem.png';
  generoElegido = '';
  nombreIngresado = false;
  combateIniciado = false;
  combateTerminado = false;
  juegoCompletado = false;
  nombreJugador = '';
  imagenJugador = '';
  vidaJugador = 0;
  vidaMaxJugador = 0;
  ataqueJugador = 0;
  defensaJugador = 0;
  jugadorDefendiendo = false;
  nombreDemonio = '';
  imagenDemonio = '';
  vidaDemonio = 0;
  vidaMaxDemonio = 0;
  ataqueDemonio = 0;
  defensaDemonio = 0;
  tipoDemonio = '';
  demonioDefendiendo = false;
  esTurnoJugador = true;
  numeroTurno = 0;
  jugadorGano = false;
  rondaActual = 1;
  totalRondas = 5;
  enemigosDerrotados = 0;
  historialEnemigos: any[] = [];
  logs: any[] = [];
  mensajeError = '';
  cargandoDemonio = false;
  modoJuego = '';
  pocionesDisponibles = 10;
  dificultad = 'normal';

  constructor(
    private dialog: MatDialog,
    private garciaService: GarciaService
  ) {}


  /**
   * Selecciona el género masculino para el jugador
   */
  elegirHombre(): void {
    this.generoElegido = 'hombre';
    this.imagenJugador = this.imagenHombre;
  }

  /**
   * Selecciona el género femenino para el jugador
   */
  elegirMujer(): void {
    this.generoElegido = 'mujer';
    this.imagenJugador = this.imagenMujer;
  }

  /**
   * Valida el nombre ingresado por el jugador usando el servicio
   */
  confirmarNombre(): void {
    this.nombreJugador = this.nombreJugador.trim();
    const error = this.garciaService.obtenerErrorNombre(this.nombreJugador);
    
    if (error) {
      this.mensajeError = error;
      return;
    }

    this.mensajeError = '';
    this.nombreIngresado = true;
  }

  /**
   * Retrocede al paso anterior en la configuración
   */
  volverAtras(): void {
    if (this.nombreIngresado) {
      this.nombreIngresado = false;
      this.mensajeError = '';
    } else if (this.generoElegido) {
      this.generoElegido = '';
      this.imagenJugador = '';
      this.nombreJugador = '';
    }
  }

  /**
   * Inicia un nuevo combate generando stats del jugador
   */
  iniciarCombate(): void {
    this.mensajeError = '';
    this.cargandoDemonio = true;
    
    if (this.rondaActual === 1) {
      const statsJugador = this.garciaService.generarStatsHumano();
      this.vidaJugador = statsJugador.vida;
      this.vidaMaxJugador = statsJugador.vida;
      this.ataqueJugador = statsJugador.ataque;
      this.defensaJugador = statsJugador.defensa;
    }
    
    this.cargarDemonioAleatorio();
  }

  /**
   * Carga un enemigo aleatorio usando el servicio
   */
  cargarDemonioAleatorio(): void {
    this.garciaService.obtenerPersonajeAleatorio().subscribe({
      next: (personaje) => {
        const enemigo = this.garciaService.crearEnemigo(personaje);
        
        this.nombreDemonio = enemigo.nombre;
        this.imagenDemonio = enemigo.imagen;
        this.vidaDemonio = enemigo.vidaActual;
        this.vidaMaxDemonio = enemigo.vidaMaxima;
        this.ataqueDemonio = enemigo.ataque;
        this.defensaDemonio = enemigo.defensa;
        this.tipoDemonio = enemigo.raza === 'Demon' ? 'Demonio' : 'Humano';

        this.cargandoDemonio = false;
        this.combateIniciado = true;
        this.esTurnoJugador = true;
        this.numeroTurno = 0;
        this.logs = [];
        this.agregarLog(`¡Ronda ${this.rondaActual}/${this.totalRondas} - Comienza el combate contra ${this.nombreDemonio}!`, 'sistema');
      },
      error: (error) => {
        this.mensajeError = 'Error al conectar con la API. Intenta de nuevo.';
        this.cargandoDemonio = false;
      }
    });
  }

  /**
   * Maneja el evento de atacar emitido por el componente hijo
   */
  manejarAtacar(): void {
    this.atacar();
  }

  /**
   * Maneja el evento de curar emitido por el componente hijo
   */
  manejarCurar(): void {
    this.curar();
  }

  /**
   * Maneja el evento de defender emitido por el componente hijo
   */
  manejarDefender(): void {
    this.defender();
  }

  /**
   * Ejecuta un ataque del jugador al enemigo
   */
  atacar(): void {
    this.numeroTurno++;
    this.jugadorDefendiendo = false;
    this.demonioDefendiendo = false;
    
    const dano = this.calcularDano(this.ataqueJugador, this.defensaDemonio, this.demonioDefendiendo);
    this.vidaDemonio = this.vidaDemonio - dano;
    if (this.vidaDemonio < 0) this.vidaDemonio = 0;
    
    this.agregarLog(`${this.nombreJugador} atacó causando ${dano} de daño. Vida del enemigo: ${this.vidaDemonio}`, 'jugador');
    
    if (this.vidaDemonio <= 0) {
      this.terminarCombate(true);
      return;
    }
    
    this.esTurnoJugador = false;
    setTimeout(() => this.turnoDemonio(), 1500);
  }

  /**
   * Activa la defensa del jugador usando el servicio
   */
  defender(): void {
    this.numeroTurno++;
    this.demonioDefendiendo = false;
    this.jugadorDefendiendo = true;
    this.agregarLog(`${this.nombreJugador} se prepara para defender (+50% defensa)`, 'jugador');
    this.esTurnoJugador = false;
    setTimeout(() => this.turnoDemonio(), 1500);
  }

  /**
   * Usa una poción para recuperar vida
   */
  curar(): void {
    if (this.pocionesDisponibles <= 0) {
      this.agregarLog('No te quedan pociones.', 'sistema');
      return;
    }

    const cantidadCura = 100;
    const vidaAntes = this.vidaJugador;
    this.vidaJugador = Math.min(this.vidaJugador + cantidadCura, this.vidaMaxJugador);
    this.pocionesDisponibles--;

    const vidaCurada = this.vidaJugador - vidaAntes;
    this.agregarLog(`${this.nombreJugador} usó una poción y recuperó ${vidaCurada} de vida. (${this.pocionesDisponibles} restantes)`, 'jugador');
    
    this.esTurnoJugador = false;
    setTimeout(() => this.turnoDemonio(), 1500);
  }

  /**
   * Ejecuta el turno del enemigo
   */
  turnoDemonio(): void {
    const accion = this.garciaService.decidirAccionEnemigo();

    if (accion === 'atacar') {
      let dano = 0;
      
      if (this.jugadorDefendiendo) {
        dano = 0;
      } else {
        dano = this.calcularDano(this.ataqueDemonio, this.defensaJugador, false);
      }

      this.vidaJugador -= dano;
      if (this.vidaJugador < 0) this.vidaJugador = 0;

      this.agregarLog(`${this.nombreDemonio} atacó causando ${dano} de daño. Tu vida: ${this.vidaJugador}`, 'demonio');

      if (this.vidaJugador <= 0) {
        this.terminarCombate(false);
        return;
      }
    } else {
      this.demonioDefendiendo = true;
      this.agregarLog(`${this.nombreDemonio} se prepara para defender (+50% defensa)`, 'demonio');
    }

    this.esTurnoJugador = true;
    this.jugadorDefendiendo = false;
  }

  /**
   * Calcula el daño de un ataque considerando defensa
   * @param ataque Valor de ataque del atacante
   * @param defensa Valor de defensa del defensor
   * @param estaDefendiendo Si el defensor está en posición defensiva
   * @returns Cantidad de daño infligido
   */
  calcularDano(ataque: number, defensa: number, estaDefendiendo: boolean): number {
    let defensaEfectiva = defensa;
    if (estaDefendiendo) {
      defensaEfectiva = defensa * 1.5;
    }
    let dano = ataque - (defensaEfectiva * 0.3);
    dano = Math.floor(dano);
    if (dano < 1) dano = 1;
    return dano;
  }

  /**
   * Finaliza el combate actual y determina el siguiente paso
   * @param ganoJugador Indica si el jugador ganó el combate
   */
  terminarCombate(ganoJugador: boolean): void {
    this.jugadorGano = ganoJugador;
    
    if (ganoJugador) {
      this.historialEnemigos.push({
        nombre: this.nombreDemonio,
        imagen: this.imagenDemonio,
        tipo: this.tipoDemonio,
        ronda: this.rondaActual
      });
      
      this.enemigosDerrotados++;
      this.agregarLog(`¡${this.nombreJugador} ha derrotado a ${this.nombreDemonio}!`, 'sistema');
      
      if (this.rondaActual < this.totalRondas) {
        setTimeout(() => this.prepararSiguienteRonda(), 2000);
      } else {
        this.juegoCompletado = true;
        this.combateTerminado = true;
        this.agregarLog(`¡${this.nombreJugador} ha completado todas las rondas!`, 'sistema');
      }
    } else {
      this.combateTerminado = true;
      this.agregarLog(`${this.nombreDemonio} ha ganado...`, 'sistema');
    }
  }

  /**
   * Prepara la siguiente ronda recuperando vida del jugador
   */
  prepararSiguienteRonda(): void {
    this.rondaActual++;
    this.combateIniciado = false;
    this.cargandoDemonio = true;
    
    const vidaRecuperada = Math.floor(this.vidaMaxJugador * 0.3);
    this.vidaJugador = Math.min(this.vidaJugador + vidaRecuperada, this.vidaMaxJugador);
    
    setTimeout(() => this.cargarDemonioAleatorio(), 1000);
  }

  /**
   * Abre un diálogo de confirmación para reiniciar el juego
   */
  reiniciarJuego(): void {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      width: '400px',
      data: {
        titulo: 'Reiniciar Juego',
        mensaje: '¿Estás seguro de que quieres jugar de nuevo?',
        textoBoton: 'Sí, reiniciar'
      }
    });
    
    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.resetearTodo();
      }
    });
  }

  /**
   * Reinicia todas las variables del juego a sus valores iniciales
   */
  resetearTodo(): void {
    this.generoElegido = '';
    this.nombreIngresado = false;
    this.combateIniciado = false;
    this.combateTerminado = false;
    this.juegoCompletado = false;
    this.nombreJugador = '';
    this.imagenJugador = '';
    this.vidaJugador = 0;
    this.vidaMaxJugador = 0;
    this.ataqueJugador = 0;
    this.defensaJugador = 0;
    this.jugadorDefendiendo = false;
    this.nombreDemonio = '';
    this.imagenDemonio = '';
    this.vidaDemonio = 0;
    this.vidaMaxDemonio = 0;
    this.ataqueDemonio = 0;
    this.defensaDemonio = 0;
    this.demonioDefendiendo = false;
    this.esTurnoJugador = true;
    this.numeroTurno = 0;
    this.jugadorGano = false;
    this.rondaActual = 1;
    this.enemigosDerrotados = 0;
    this.historialEnemigos = [];
    this.logs = [];
    this.mensajeError = '';
    this.pocionesDisponibles = 10;
  }

  /**
   * Añade un mensaje al registro de eventos del combate
   * @param mensaje Texto del mensaje a registrar
   * @param tipo Tipo de mensaje (jugador, demonio, sistema)
   */
  agregarLog(mensaje: string, tipo: string): void {
    const nuevoLog = {
      id: Date.now(),
      turno: this.numeroTurno,
      mensaje: mensaje,
      tipo: tipo
    };
    this.logs.push(nuevoLog);
  }
}