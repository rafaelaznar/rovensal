import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {
  Character,
  CharacterResponse,
  CombatStats,
  Combatiente,
  ResultadoAtaque
} from '../model/apiInterface';

@Injectable({
  providedIn: 'root'
})
export class GarciaService {
  private apiUrl = 'https://corsproxy.io/?';
  private demonSlayerApi = 'https://www.demonslayer-api.com/api/v1/characters';
  private imagenHombre = '/garcia/imagenes/personajeMasc.png';
  private imagenMujer = '/garcia/imagenes/personajeFem.png';

  constructor(private http: HttpClient) {
    console.log('GarciaService inicializado');
  }

  obtenerPersonajes(): Observable<Character[]> {
    const url = `${this.apiUrl}${encodeURIComponent(this.demonSlayerApi)}`;
    return this.http.get<CharacterResponse>(url).pipe(
      tap(response => console.log('API respondió:', response)),
      map((response: CharacterResponse) => response.content),
      catchError((error) => {
        console.error('❌ Error en API:', error);
        return of([]);
      })
    );
  }

  obtenerPersonajeAleatorio(): Observable<Character> {
    return this.obtenerPersonajes().pipe(
      map((personajes: Character[]) => {
        if (personajes.length === 0) {
          throw new Error('No hay personajes disponibles');
        }
        const indice = Math.floor(Math.random() * personajes.length);
        return personajes[indice];
      })
    );
  }

  //Generar numeros aletarorios para los personajes raza humana
  generarStatsHumano(): CombatStats {
    return {
      vida: this.numeroAleatorio(30, 100),
      ataque: this.numeroAleatorio(20, 50),
      defensa: this.numeroAleatorio(20, 50)
    };
  }

  //Generar numeros aletarorios para los personajes raza demonio
  generarStatsDemonio(): CombatStats {
    return {
      vida: this.numeroAleatorio(30, 200),
      ataque: this.numeroAleatorio(20, 100),
      defensa: this.numeroAleatorio(20, 100)
    };
  }

  crearJugador(nombre: string, genero: string): Combatiente {
    const stats = this.generarStatsHumano();
    const imagen = genero === 'hombre' ? this.imagenHombre : this.imagenMujer;

    const jugador: Combatiente = {
      nombre: nombre,
      imagen: imagen,
      vidaActual: stats.vida,
      vidaMaxima: stats.vida,
      ataque: stats.ataque,
      defensa: stats.defensa,
      estaDefendiendo: false,
      tipo: 'Jugador',
      raza: 'Human'
    };

    console.log('Jugador creado:', jugador);
    return jugador;
  }

  crearEnemigo(personaje: Character): Combatiente {
    const esDemonio = personaje.race === 'Demon';
    const stats = esDemonio ? this.generarStatsDemonio() : this.generarStatsHumano();

    const enemigo: Combatiente = {
      nombre: personaje.name,
      imagen: personaje.img,
      vidaActual: stats.vida,
      vidaMaxima: stats.vida,
      ataque: stats.ataque,
      defensa: stats.defensa,
      estaDefendiendo: false,
      tipo: 'Enemigo',
      raza: personaje.race
    };

    console.log('Enemigo creado:', enemigo);
    return enemigo;
  }

  calcularAtaque(atacante: Combatiente, defensor: Combatiente): ResultadoAtaque {
    let defensaEfectiva = defensor.defensa;
    if (defensor.estaDefendiendo) {
      defensaEfectiva = defensor.defensa * 1.5;
    }

    let dano = atacante.ataque - (defensaEfectiva * 0.3);
    dano = Math.floor(dano);
    if (dano < 1) dano = 1;

    const nuevaVida = defensor.vidaActual - dano;
    defensor.vidaActual = nuevaVida < 0 ? 0 : nuevaVida;

    const resultado: ResultadoAtaque = {
      dano: dano,
      vidaRestante: defensor.vidaActual,
      mensaje: `${atacante.nombre} atacó a ${defensor.nombre} causando ${dano} de daño`,
      estaDefendiendo: defensor.estaDefendiendo
    };

    return resultado;
  }

  activarDefensa(combatiente: Combatiente): void {
    combatiente.estaDefendiendo = true;
  }

  resetearDefensa(combatiente: Combatiente): void {
    combatiente.estaDefendiendo = false;
  }

  estaDerrotado(combatiente: Combatiente): boolean {
    return combatiente.vidaActual <= 0;
  }

  decidirAccionEnemigo(): 'atacar' | 'defender' {
    const random = Math.random();
    return random < 0.7 ? 'atacar' : 'defender';
  }

  validarNombre(nombre: string): boolean {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,20}$/;
    return regex.test(nombre.trim());
  }

  obtenerErrorNombre(nombre: string): string {
    const nombreLimpio = nombre.trim();

    if (nombreLimpio.length === 0) return 'Por favor ingresa un nombre';
    if (nombreLimpio.length < 3) return 'El nombre debe tener al menos 3 caracteres';
    if (nombreLimpio.length > 20) return 'El nombre no puede tener más de 20 caracteres';

    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regex.test(nombreLimpio)) return 'El nombre solo puede tener letras y espacios';

    return '';
  }

  private numeroAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  calcularPorcentajeVida(vidaActual: number, vidaMaxima: number): number {
    if (vidaMaxima === 0) return 0;
    return (vidaActual / vidaMaxima) * 100;
  }

  obtenerClaseVida(porcentaje: number): string {
    if (porcentaje > 60) return 'vida-alta';
    if (porcentaje > 30) return 'vida-media';
    return 'vida-baja';
  }

  obtenerImagenPorGenero(genero: string): string {
    return genero === 'hombre' ? this.imagenHombre : this.imagenMujer;
  }
}
