import { Component, OnInit } from '@angular/core';
import { MemoTestGame } from '../../../clases/memo-test-game';
import { randomInt } from '../../../../utils/randomIntGenerator.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { GamesService } from '../../../services/games.service';
import { Router } from '@angular/router';
import { GameEnum } from '../../../clases/gameName.enum';
@Component({
  selector: 'app-memo-test',
  templateUrl: './memo-test.component.html',
  styleUrls: ['./memo-test.component.scss']
})
export class MemoTestComponent implements OnInit {
  public newGame: MemoTestGame;
  public displayNumbers = false;
  showInput = false;
  timer: number;
  interval: any;
  userSequence;
  disableButton = false;
  currentUserId: any;
  playerName: any;
  gameId: any;
  resultId: any;
  score: any;
  currentStreak: number;
  attempts: number;
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
    this.gameService
      .getGameIdByName({ name: GameEnum.MEMO_TEST })
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
        this.timer = 1;
        this.disableButton = true;
      }
    }, 1000);
  }

  CheckSequence(userSequence) {
    this.attempts++;
    this.newGame.won = userSequence ? this.newGame.checkSequence(userSequence) : false;
    if (this.newGame.won) {
      this._snackBar.open('You won, congratulations!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
      this.currentStreak++;
      this.checkResult();
      this.ResetGame();
    } else {
      if (this.attempts === 3) {
        // The game is over, check if the player beat his score
        // this.ResetGame();
        this._snackBar.open('You almost beat your last score, best luck next time', 'Ok', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
        this.currentStreak = 0;
        this.ResetGame();
      } else {
        this._snackBar.open(`Sorry that's not the sequence`, 'Ok', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
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
    this.newGame = new MemoTestGame();
    this.newGame.numberList = [];
    this.showInput = false;
    this.timer = 10;
    this.attempts = 0;
    this.userSequence = null;
  }

  Logout() {
    this.authService.Logout();
  }
}
