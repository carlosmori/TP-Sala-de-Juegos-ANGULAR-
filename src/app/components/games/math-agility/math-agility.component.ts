import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { randomInt } from '../../../../utils/randomIntGenerator.js';
import { MathAgilityGame } from '../../../clases/math-agility-game.js';
import { AuthService } from '../../../services/auth.service.js';
import { GamesService } from '../../../services/games.service.js';
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
  currentUserId: any;
  playerName: any;
  gameId: any;
  resultId: any;
  score: any;
  currentStreak: number;
  constructor(
    private _snackBar: MatSnackBar,
    private gameService: GamesService,
    private router: Router,
    private authService: AuthService
  ) {
    this.currentStreak = 0;
    this.ResetGame();
  }

  ngOnInit() {
    const { uid, displayName } = this.authService.GetCurrentUser();
    this.currentUserId = uid;
    this.playerName = displayName;
    //@todo move name to GameEnum
    this.gameService
      .getGameIdByName({ name: 'mathAgility' })
      .switchMap((game) => {
        if (game.length === 0) {
          this.router.navigate(['/Games']);
        }
        const { gameId } = game[0];

        return this.gameService.getGameResultsById({
          gameId,
          userId: this.currentUserId
        });
      })
      .subscribe(
        (gameResult) => {
          console.log(gameResult);
          //@todo check how to flatten the response so I dont need to [0] the response
          const { gameId, resultId, userId, result } = gameResult[0];
          this.gameId = gameId;
          this.resultId = resultId;
          this.currentUserId = userId;
          this.score = result;
        },
        (error) => {
          this._snackBar.open(`There was an error loading the game Id: ${error}`, 'Ok', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.router.navigate(['/Games']);
          console.log('error');
        }
      );
  }
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
        this.currentStreak = 0;
        this._snackBar.open('Sorry you lost, try again!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
        this.ResetGame();
      }
    }, 1000);
  }
  Verify() {
    if (this.newGame.inputNumber == this.newGame.result) {
      this.currentStreak++;
      this._snackBar.open('You won, congratulations!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
      clearInterval(this.interval);
      this.checkResult();
      this.ResetGame();
    } else {
      this._snackBar.open('Wrong answer, keep trying!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }
  }
  checkResult() {
    if (this.currentStreak > this.score) {
      this.gameService.updateScoreByUserId({ resultId: this.resultId, result: this.currentStreak });
      this._snackBar.open('Congrats you beat your own mark!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }
  }
  ResetGame() {
    this.displayVerify = false;
    this.gameStarted = false;
    this.time = 5;
    this.newGame = new MathAgilityGame();
  }
  Logout() {
    this.authService.Logout();
  }
}
