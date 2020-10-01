import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JuegoAdivina } from '../../../clases/juego-adivina';
import { AuthService } from '../../../services/auth.service';
import { GamesService } from '../../../services/games.service';

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
  currentUserId: any;
  playerName: any;
  gameId: any;
  resultId: any;
  score: any;

  constructor(
    private _snackBar: MatSnackBar,
    private gameService: GamesService,
    private router: Router,
    private authService: AuthService
  ) {
    this.newGame = new JuegoAdivina();
    this.displayVerify = false;
    this.numberGenerated = false;
    console.info('numero Secreto:', this.newGame.secretNumber);
  }
  ngOnInit() {
    const { uid, displayName } = this.authService.GetCurrentUser();
    this.currentUserId = uid;
    this.playerName = displayName;
    //@todo move name to GameEnum
    this.gameService
      .getGameIdByName({ name: 'keyPress' })
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
  Logout() {
    this.authService.Logout();
  }
}
