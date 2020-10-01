import { Component, OnInit } from '@angular/core';
import { GameRockPaperScissors } from '../../../clases/game-rock-paper-scissors';
import { randomInt } from '../../../../utils/randomIntGenerator.js';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-rock-paper-scissors',
  templateUrl: './rock-paper-scissors.component.html',
  styleUrls: ['./rock-paper-scissors.component.scss']
})
export class RockPaperScissorsComponent implements OnInit {
  public newGame: GameRockPaperScissors;
  enableReset: boolean;
  gameStarted: boolean;

  constructor(private _snackBar: MatSnackBar) {
    this.newGame = new GameRockPaperScissors();
    this.enableReset = false;
    this.gameStarted = false;
  }

  ngOnInit(): void {}

  Begin() {
    this.gameStarted = true;
  }
  Reset() {
    this._snackBar.open('Here I would reset the game', 'Ok', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
  pick(move) {
    const result = this.newGame.checkMatch(randomInt(0, 3), move);
    if (result === 'Draw') {
      this._snackBar.open(`It's a Draw`, 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    } else if (result === 'Win') {
      this._snackBar.open('Congrats, you have won!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
      this.newGame.playerScore++;
    } else {
      this._snackBar.open('You Lost, maybe Next Time!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
      this.newGame.machineScore++;
    }
    if (this.newGame.machineScore + this.newGame.playerScore > 2) {
      this.CheckGame();
    }
  }
  CheckGame() {
    this.newGame.checkGame();
    if (this.newGame.machineWon) {
      this._snackBar.open('You Lost the Match!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }
    if (this.newGame.playerwon) {
      this._snackBar.open('You Won the Match!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }
    if (this.newGame.machineWon || this.newGame.playerwon) {
      this.enableReset = true;
    }
  }
}
