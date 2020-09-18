import { Component, OnInit } from '@angular/core';
import { JuegoMemoTest } from '../../clases/juego-memotest';
import { randomInt } from '../../../utils/randomIntGenerator.js';
@Component({
  selector: 'app-memo-test',
  templateUrl: './memo-test.component.html',
  styleUrls: ['./memo-test.component.scss']
})
export class MemoTestComponent {
  public nuevoJuego: JuegoMemoTest;
  public displayNumbers = false;
  mostrarInput = false;
  tiempo: number;
  repetidor: any;
  numerosUsuario;
  disableButton = false;
  constructor() {
    this.nuevoJuego = new JuegoMemoTest();
    this.nuevoJuego.listaDeNumeros = [];
    this.mostrarInput = false;
    this.tiempo = 10;
  }

  comenzar() {
    for (let i = 0; i <= 5; i++) {
      this.nuevoJuego.listaDeNumeros.push(randomInt(0, 100));
    }
    this.displayNumbers = true;
    console.log(this.nuevoJuego.listaDeNumeros);
    this.repetidor = setInterval(() => {
      this.tiempo--;
      if (this.tiempo == 0) {
        clearInterval(this.repetidor);
        this.mostrarInput = true;
        this.displayNumbers = false;
        this.tiempo = 5;
        this.disableButton = true;
      }
    }, 1000);
  }

  chequearSecuencia(secuenciaNumerosUsuario) {
    this.nuevoJuego.gano = this.nuevoJuego.chequearSecuencia(secuenciaNumerosUsuario);
    if (this.nuevoJuego.gano) {
      alert('Felicidades');
    } else {
      alert('Perdiste');
    }
  }
}
