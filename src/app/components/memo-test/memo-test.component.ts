import { Component, OnInit } from '@angular/core';
import { MemoTestGame } from '../../clases/memo-test-game';
import { randomInt } from '../../../utils/randomIntGenerator.js';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-memo-test',
  templateUrl: './memo-test.component.html',
  styleUrls: ['./memo-test.component.scss']
})
export class MemoTestComponent {
  public newGame: MemoTestGame;
  public displayNumbers = false;
  showInput = false;
  timer: number;
  interval: any;
  userSequence;
  disableButton = false;
  enableReset: boolean;
  constructor(private _snackBar: MatSnackBar) {
    this.newGame = new MemoTestGame();
    this.newGame.numberList = [];
    this.showInput = false;
    this.timer = 10;
    this.enableReset = false;
  }
  Reset() {
    this._snackBar.open('Here I would reset the game', 'Ok', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
  Begin() {
    this.displayNumbers = true;
    for (let i = 0; i <= 5; i++) {
      this.newGame.numberList.push(randomInt(0, 100));
    }
    console.log(this.newGame.numberList);
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer == 0) {
        clearInterval(this.interval);
        this.showInput = true;
        this.displayNumbers = false;
        this.timer = 5;
        this.disableButton = true;
      }
    }, 1000);
  }

  CheckSequence(userSequence) {
    this.newGame.won = this.newGame.checkSequence(userSequence);
    if (this.newGame.won) {
      this._snackBar.open('Congratulations, you win!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    } else {
      this._snackBar.open(`Sorry that's not the sequence`, 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }
    this.showInput = false;
    this.enableReset = true;
  }
}
