import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BarraVidaComponent } from '../barra-vida/barra-vida';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion';

@Component({
  selector: 'app-garcia',
  standalone: true,
  imports: [CommonModule, FormsModule, BarraVidaComponent],
  templateUrl: './garciaComponent.html',
  styleUrls: ['./garciaComponent.css']
})
export class GarciaComponent implements OnInit {
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

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    console.log('✅ Constructor ejecutado - Dependencias inyectadas');
  }

  ngOnInit(): void {
    console.log('🎮 Componente cargado - ngOnInit ejecutado');
    this.route.params.subscribe(params => {
      this.modoJuego = params['modo'] || 'normal';
      console.log('📍 Modo de juego:', this.modoJuego);
    });
  }

  elegirHombre(): void {
    this.generoElegido = 'hombre';
    this.imagenJugador = this.imagenHombre;
    console.log('👨 Género elegido: Hombre');
  }

  elegirMujer(): void {
    this.generoElegido = 'mujer';
    this.imagenJugador = this.imagenMujer;
    console.log('👩 Género elegido: Mujer');
  }

  confirmarNombre(): void {
    this.nombreJugador = this.nombreJugador.trim();
    if (this.nombreJugador === '') {
      this.mensajeError = 'Por favor ingresa un nombre';
      return;
    }
    if (this.nombreJugador.length < 3) {
      this.mensajeError = 'El nombre debe tener al menos 3 caracteres';
      return;
    }
    if (this.nombreJugador.length > 20) {
      this.mensajeError = 'El nombre no puede tener más de 20 caracteres';
      return;
    }
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regex.test(this.nombreJugador)) {
      this.mensajeError = 'El nombre solo puede tener letras';
      return;
    }
    this.mensajeError = '';
    this.nombreIngresado = true;
    console.log('✅ Nombre validado:', this.nombreJugador);
  }

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

  iniciarCombate(): void {
    console.log('⚔️ Iniciando combate...');
    this.mensajeError = '';
    this.cargandoDemonio = true;
    if (this.rondaActual === 1) {
      this.vidaJugador = this.numeroAleatorio(80, 100);
      this.vidaMaxJugador = this.vidaJugador;
      this.ataqueJugador = this.numeroAleatorio(30, 50);
      this.defensaJugador = this.numeroAleatorio(20, 40);
      console.log('📊 Stats del jugador:', {
        vida: this.vidaJugador,
        ataque: this.ataqueJugador,
        defensa: this.defensaJugador
      });
    }
    this.cargarDemonioAleatorio();
  }

  cargarDemonioAleatorio(): void {
    const url = 'https://corsproxy.io/?' + encodeURIComponent('https://www.demonslayer-api.com/api/v1/characters');
    this.http.get<any>(url).subscribe({
      next: (respuesta) => {
        console.log('📡 API respondió correctamente');
        const personajes = respuesta.content;
        const indiceAleatorio = Math.floor(Math.random() * personajes.length);
        const personajeElegido = personajes[indiceAleatorio];
        this.nombreDemonio = personajeElegido.name;
        this.imagenDemonio = personajeElegido.img;
        const esRealmenteDemonio = personajeElegido.race === 'Demon';
        this.tipoDemonio = esRealmenteDemonio ? 'Demonio' : 'Humano';
        const multiplicador = 1 + (this.rondaActual - 1) * 0.2;
        if (esRealmenteDemonio) {
          this.vidaDemonio = Math.floor(this.numeroAleatorio(100, 150) * multiplicador);
          this.ataqueDemonio = Math.floor(this.numeroAleatorio(40, 70) * multiplicador);
          this.defensaDemonio = Math.floor(this.numeroAleatorio(30, 60) * multiplicador);
        } else {
          this.vidaDemonio = Math.floor(this.numeroAleatorio(70, 100) * multiplicador);
          this.ataqueDemonio = Math.floor(this.numeroAleatorio(25, 45) * multiplicador);
          this.defensaDemonio = Math.floor(this.numeroAleatorio(20, 40) * multiplicador);
        }
        this.vidaMaxDemonio = this.vidaDemonio;
        console.log(`👹 Enemigo ${this.rondaActual}/5 cargado:`, {
          nombre: this.nombreDemonio,
          tipo: this.tipoDemonio,
          vida: this.vidaDemonio,
          ataque: this.ataqueDemonio,
          defensa: this.defensaDemonio
        });
        this.cargandoDemonio = false;
        this.combateIniciado = true;
        this.esTurnoJugador = true;
        this.numeroTurno = 0;
        this.logs = [];
        this.agregarLog(`¡Ronda ${this.rondaActual}/5 - Comienza el combate contra ${this.nombreDemonio}!`, 'sistema');
      },
      error: (error) => {
        console.error('❌ Error al cargar enemigo:', error);
        this.mensajeError = 'Error al conectar con la API. Intenta de nuevo.';
        this.cargandoDemonio = false;
      }
    });
  }

  atacar(): void {
    this.numeroTurno++;
    console.log('💥 Turno', this.numeroTurno, '- Jugador ataca');
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

  defender(): void {
    this.numeroTurno++;
    console.log('🛡️ Turno', this.numeroTurno, '- Jugador defiende');
    this.demonioDefendiendo = false;
    this.jugadorDefendiendo = true;
    this.agregarLog(`${this.nombreJugador} se prepara para defender (+50% defensa)`, 'jugador');
    this.esTurnoJugador = false;
    setTimeout(() => this.turnoDemonio(), 1500);
  }

  pocionesDisponibles = 10;

  curar(): void {
  if (this.pocionesDisponibles <= 0) {
    this.agregarLog('❌ No te quedan pociones.', 'sistema');
    return;
  }

  const cantidadCura = 100;
  const vidaAntes = this.vidaJugador;
  this.vidaJugador = Math.min(this.vidaJugador + cantidadCura, this.vidaMaxJugador);
  this.pocionesDisponibles--;

  const vidaCurada = this.vidaJugador - vidaAntes;
  this.agregarLog(`🧪 ${this.nombreJugador} usó una poción y recuperó ${vidaCurada} de vida. (${this.pocionesDisponibles} restantes)`, 'jugador');
}

  turnoDemonio(): void {
    const random = Math.random();
    if (random < 0.7) {
      const dano = this.calcularDano(this.ataqueDemonio, this.defensaJugador, this.jugadorDefendiendo);
      this.vidaJugador = this.vidaJugador - dano;
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
  }

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
    console.log('🏁 Combate terminado. Ganador:', ganoJugador ? 'Jugador' : 'Enemigo');
  }

  prepararSiguienteRonda(): void {
    this.rondaActual++;
    this.combateIniciado = false;
    this.cargandoDemonio = true;
    const vidaRecuperada = Math.floor(this.vidaMaxJugador * 0.3);
    this.vidaJugador = Math.min(this.vidaJugador + vidaRecuperada, this.vidaMaxJugador);
    console.log(`💚 Recuperaste ${vidaRecuperada} de vida. Vida actual: ${this.vidaJugador}`);
    setTimeout(() => this.cargarDemonioAleatorio(), 1000);
  }

  reiniciarJuego(): void {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      width: '400px',
      data: {
        titulo: '🔄 Reiniciar Juego',
        mensaje: '¿Estás seguro de que quieres jugar de nuevo?',
        textoBoton: 'Sí, reiniciar'
      }
    });
    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        console.log('🔄 Reiniciando juego...');
        this.resetearTodo();
      }
    });
  }

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

  numeroAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  agregarLog(mensaje: string, tipo: string): void {
    const nuevoLog = {
      id: Date.now(),
      turno: this.numeroTurno,
      mensaje: mensaje,
      tipo: tipo
    };
    this.logs.push(nuevoLog);
    console.log('📝 Log:', mensaje);
  }
}
