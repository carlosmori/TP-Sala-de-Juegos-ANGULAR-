import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { randomInt } from '../../../../utils/randomIntGenerator.js';
import { MathAgilityGame } from '../../../clases/math-agility-game.js';
import { AuthService } from '../../../services/auth.service.js';
@Component({
  selector: 'app-math-agility',
  templateUrl: './math-agility.component.html',
  styleUrls: ['./math-agility.component.scss']
})
export class MathAgilityComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  public newGame: MathAgilityGame;
  displayVerify: boolean;
  time: number;
  interval: any;
  gameStarted: boolean;
  enableReset: boolean;
  constructor(private _snackBar: MatSnackBar, private authService: AuthService) {
    this.displayVerify = false;
    this.gameStarted = false;
    this.enableReset = false;
    this.time = 5;
    this.newGame = new MathAgilityGame();
  }

  ngOnInit() {}
  Reset() {
    this._snackBar.open('Here I would reset the game', 'Ok', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
  Begin() {
    this.gameStarted = true;
    this.newGame.firstNumber = randomInt(0, 10);
    this.newGame.secondNumber = randomInt(0, 10);
    this.newGame.selectedOperator = this.newGame.operators[randomInt(1, 3)];
    this.newGame.result = eval(
      `${this.newGame.firstNumber + this.newGame.selectedOperator + this.newGame.secondNumber}`
    );
    console.log(`Respuesta ${this.newGame.result}`);
    this.displayVerify = true;

    this.interval = setInterval(() => {
      this.time--;
      if (this.time == 0) {
        clearInterval(this.interval);
        this.Verify();
        this.displayVerify = false;
        this.time = 5;
        this._snackBar.open('Sorry you lost, try again!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
        this.gameStarted = false;
        this.enableReset = true;
      }
    }, 1000);
  }
  Verify() {
    if (this.newGame.inputNumber == this.newGame.result) {
      this._snackBar.open('You are the Winner!!!!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
      clearInterval(this.interval);
      this.displayVerify = false;
      this.gameStarted = false;
      this.enableReset = true;
    } else {
      this._snackBar.open('Wrong answer, keep trying!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }
  }
  Logout() {
    this.authService.Logout();
  }
}
