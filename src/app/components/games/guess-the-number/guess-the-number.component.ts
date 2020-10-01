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
  attempts: number;
  displayVerify: boolean;
  numberGenerated: boolean;
  enableReset: boolean;
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
      .getGameIdByName({ name: 'guessTheNumber' })
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
    this.attempts = 0;
    console.info('numero Secreto:', this.newGame.secretNumber);
  }
  Verify() {
    this.attempts++;
    if (this.newGame.verificar()) {
      this.currentStreak++;
      this._snackBar.open('You won, congratulations!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
      this.checkResult();
      this.ResetGame();
    } else {
      switch (this.attempts) {
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
        case 4:
        case 5:
          const hint = this.newGame.throwHint();
          this._snackBar.open(`Here is a little hint, ${hint}`, 'Ok', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          break;
        default:
          this._snackBar.open('You almost beat your last score, best luck next time', 'Ok', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          this.currentStreak = 0;
          this.ResetGame();
          break;
      }
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
    this.newGame = new JuegoAdivina();
    this.displayVerify = false;
    this.numberGenerated = false;
    this.attempts = 0;
    console.info('numero Secreto:', this.newGame.secretNumber);
  }
  Logout() {
    this.authService.Logout();
  }
}
