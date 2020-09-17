import { Component, OnInit } from '@angular/core';
import { Juego } from '../../clases/juego';
import { JuegoAnagrama } from '../../clases/juego-anagrama';
import { randomInt } from '../../../utils/randomIntGenerator.js';
@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.scss']
})
export class AnagramaComponent implements OnInit {
  public nuevoJuego: JuegoAnagrama;
  public palabraDesordenada = null;
  public palabraUsuario = '';
  public message = '';
  public intentos = 0;
  public disableButton = false;
  public showResetButton = false;

  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  constructor() {
    this.nuevoJuego = new JuegoAnagrama();
    const palabraSecreta = this.nuevoJuego.listaDePalabras[
      randomInt(0, this.nuevoJuego.listaDePalabras.length)
    ];
    this.nuevoJuego.palabraSecreta = palabraSecreta;
    this.palabraDesordenada = this.shuffle(this.nuevoJuego.palabraSecreta.split(''));
  }

  ngOnInit() {
    this.palabraDesordenada = this.palabraDesordenada.join(' ');
    console.log(this.palabraDesordenada);
  }

  chequearPalabra(palabraUsuario: string) {
    console.log(this.nuevoJuego.palabraSecreta);
    this.intentos++;
    if (this.nuevoJuego.chequearPalabra(palabraUsuario)) {
      this.message = 'Ganaste';
      this.showResetButton = true;
    } else {
      if (this.intentos === 3) {
        this.message = 'Quizas la proxima amigo!';
        this.disableButton = true;
        this.showResetButton = true;
        return;
      }
      this.message = 'Lo siento sigue intentadolo';
    }
  }
  resetGame() {
    alert('ResetGame');
  }
}
