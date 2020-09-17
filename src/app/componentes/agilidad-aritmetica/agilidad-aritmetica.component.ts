import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad';

import { Subscription } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { randomInt } from '../../../utils/randomIntGenerator.js';
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  public nuevoJuego: JuegoAgilidad;
  ocultarVerificar = false;
  Tiempo: number;
  repetidor: any;
  private subscription: Subscription;

  constructor() {
    this.ocultarVerificar = true;
    this.Tiempo = 5;
    this.nuevoJuego = new JuegoAgilidad();
    console.info('Inicio agilidad');
  }

  ngOnInit() {
    this.nuevoJuego.operadores = ['+', '-', '*'];
    this.nuevoJuego.gano = false;
  }

  NuevoJuego() {
    this.nuevoJuego.primerNumero = randomInt(0, 100);
    this.nuevoJuego.segundoNumero = randomInt(0, 100);
    this.nuevoJuego.operadorSeleccionado = this.nuevoJuego.operadores[randomInt(1, 3)];
    this.nuevoJuego.resultado = eval(
      `${
        this.nuevoJuego.primerNumero +
        this.nuevoJuego.operadorSeleccionado +
        this.nuevoJuego.segundoNumero
      }`
    );
    this.ocultarVerificar = false;

    this.repetidor = setInterval(() => {
      this.Tiempo--;
      console.log('llego', this.Tiempo);
      if (this.Tiempo == 0) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar = true;
        this.Tiempo = 5;
      }
    }, 1000);
  }
  verificar() {
    this.nuevoJuego.gano = this.nuevoJuego.numeroIngresado == this.nuevoJuego.resultado;
    this.ocultarVerificar = true;
    clearInterval(this.repetidor);
  }
}
