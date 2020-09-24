import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JuegoAdivina } from '../../clases/juego-adivina';

@Component({
  selector: 'app-guess-the-number',
  templateUrl: './guess-the-number.component.html',
  styleUrls: ['./guess-the-number.component.scss']
})
export class GuessTheNumberComponent implements OnInit {
  newGame: JuegoAdivina;
  counter: number;
  displayVerify: boolean;
  numberGenerated: boolean;
  enableReset: boolean;

  constructor(private _snackBar: MatSnackBar) {
    this.newGame = new JuegoAdivina();
    this.displayVerify = false;
    this.numberGenerated = false;
    console.info('numero Secreto:', this.newGame.secretNumber);
  }
  Begin() {
    this.numberGenerated = true;
    this.newGame.generateSecretNumber();
    this.counter = 0;
    console.info('numero Secreto:', this.newGame.secretNumber);
  }
  Verify() {
    this.counter++;
    if (this.newGame.verificar()) {
      this.enableReset = true;
      this._snackBar.open('You are the Winner!!!!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    } else {
      switch (this.counter) {
        case 1:
          this._snackBar.open('Not Yet, you can do it!', 'Ok', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          break;
        case 2:
          this._snackBar.open('Nop, are you getting closer?', 'Ok', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          break;
        case 3:
          this._snackBar.open('Third is the charm? Guess not', 'Ok', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          break;
        case 4:
          this._snackBar.open(`It wasnt ${this.newGame.inputNumber}`, 'Ok', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          break;
        case 5:
          this._snackBar.open(`${this.counter} attempts and counting...`, 'Ok', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          break;
        case 6:
          this._snackBar.open('Lucky in Love', 'Ok', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          break;

        default:
          const hint = this.newGame.throwHint();
          this._snackBar.open(`Here is a little hint, ${hint}`, 'Ok', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          break;
      }
    }
  }
  Reset() {
    this._snackBar.open(`Here I would reset the game`, 'Ok', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
  ngOnInit() {}
}
