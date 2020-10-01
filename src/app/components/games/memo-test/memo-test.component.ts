import { Component, OnInit } from '@angular/core';
import { MemoTestGame } from '../../../clases/memo-test-game';
import { randomInt } from '../../../../utils/randomIntGenerator.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { GamesService } from '../../../services/games.service';
import { Router } from '@angular/router';
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
    this.newGame = new MemoTestGame();
    this.newGame.numberList = [];
    this.showInput = false;
    this.timer = 10;
    this.enableReset = false;
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
  Logout() {
    this.authService.Logout();
  }
}
