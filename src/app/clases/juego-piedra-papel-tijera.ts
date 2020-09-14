export class JuegoPiedraPapelTijera {
  scoreJugador: number;
  scoreMaquina: number;
  ganoJugador: boolean;
  ganoMaquina: boolean;
  constructor() {
    this.scoreJugador = 0;
    this.scoreMaquina = 0;
    this.ganoJugador = false;
    this.ganoMaquina = false;
  }
  public evaluarPartida(eleccionMaquina, eleccionJugador) {
    console.log(eleccionMaquina);
    console.log(eleccionJugador);
    const processResult = (3 + eleccionMaquina - eleccionJugador) % 3;
    if (!processResult) {
      return 'Empate';
    } else if (1 == processResult) {
      return 'Pierde';
    } else {
      return 'Gana';
    }
  }
  public evaluarJuego() {
    if (this.scoreJugador < 3 && this.scoreMaquina < 3) {
      return false;
    }
    if (this.scoreJugador === 3) {
      this.ganoJugador = true;
    } else {
      this.ganoMaquina = true;
    }
  }
}
