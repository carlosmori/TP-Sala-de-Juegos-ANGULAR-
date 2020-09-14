import { Component, OnInit } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.scss']
})
export class PiedraPapelTijeraComponent implements OnInit {
  public nuevoJuego: JuegoPiedraPapelTijera;
  public displayMessage: string;
  constructor() {
    this.nuevoJuego = new JuegoPiedraPapelTijera();
  }

  ngOnInit(): void {}

  randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
  }

  pick(move) {
    // const moves = {
    //   0: 'rock',
    //   1: 'paper',
    //   2: 'siscsors'
    // };
    const resultado = this.nuevoJuego.evaluarPartida(this.randomInt(0, 3), move);
    if (resultado === 'Empate') {
      this.displayMessage = 'Es un Empate';
    } else if (resultado === 'Gana') {
      this.displayMessage = 'Felicidades, has ganado';
      this.nuevoJuego.scoreJugador++;
    } else {
      this.displayMessage = 'Lo siento, quizas la proxima!';
      this.nuevoJuego.scoreMaquina++;
    }
    const result = this.nuevoJuego.evaluarJuego();
    if (this.nuevoJuego.ganoJugador) {
      alert('Felciidades');
    }
    if (this.nuevoJuego.ganoMaquina) {
      alert('Lo siento');
    }
  }
}
