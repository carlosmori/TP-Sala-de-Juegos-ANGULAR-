import { Component, OnInit } from '@angular/core';
import { GameRockPaperScissors } from '../../../clases/game-rock-paper-scissors';
import { randomInt } from '../../../../utils/randomIntGenerator.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { GamesService } from '../../../services/games.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rock-paper-scissors',
  templateUrl: './rock-paper-scissors.component.html',
  styleUrls: ['./rock-paper-scissors.component.scss']
})
export class RockPaperScissorsComponent implements OnInit {
  public newGame: GameRockPaperScissors;
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

  ngOnInit(): void {
    const { uid, displayName } = this.authService.GetCurrentUser();
    this.currentUserId = uid;
    this.playerName = displayName;
    //@todo move name to GameEnum
    this.gameService
      .getGameIdByName({ name: 'rockPaperScissors' })
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
      this._snackBar.open('You almost beat your last score, best luck next time', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
      this.currentStreak = 0;
    }
    if (this.newGame.playerwon) {
      this._snackBar.open('You won, congratulations!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
      this.currentStreak++;
      this.checkResult();
    }
    if (this.newGame.machineWon || this.newGame.playerwon) {
      this.ResetGame();
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
    this.newGame = new GameRockPaperScissors();
    this.gameStarted = false;
  }
  Logout() {
    this.authService.Logout();
  }
}
