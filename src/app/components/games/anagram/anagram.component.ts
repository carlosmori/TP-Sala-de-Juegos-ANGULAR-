import { Component, OnInit } from '@angular/core';
import { Juego } from '../../../clases/juego';
import { AnagramGame } from '../../../clases/anagram-game';
import { randomInt } from '../../../../utils/randomIntGenerator.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { GamesService } from '../../../services/games.service';
import { Router } from '@angular/router';
import { GameEnum } from '../../../clases/gameName.enum';
@Component({
  selector: 'app-anagram',
  templateUrl: './anagram.component.html',
  styleUrls: ['./anagram.component.scss']
})
export class AnagramComponent implements OnInit {
  newGame: AnagramGame;
  unorderedWord: any;
  userWord: string;
  attempts: number;
  disableButton: boolean;
  enableReset: boolean;
  gameStarted: boolean;
  score: number;
  currentUserId: any;
  playerName: any;
  gameId: any;
  resultId: any;
  currentStreak: any;

  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

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
      .getGameIdByName({ name: GameEnum.ANAGRAM })
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
          console.log(resultId);
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
    console.log(this.newGame.secretWord);
  }
  CheckWord(userWord: string) {
    this.attempts++;
    if (this.newGame.checkWord(userWord)) {
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
        this._snackBar.open('Keep trying!', 'Ok', {
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
    this.unorderedWord = null;
    this.userWord = '';
    this.attempts = 0;
    this.disableButton = false;
    this.enableReset = false;
    this.gameStarted = false;
    this.newGame = new AnagramGame();
    const secretWord = this.newGame.wordList[randomInt(0, this.newGame.wordList.length)];
    this.newGame.secretWord = secretWord;
    this.unorderedWord = this.shuffle(this.newGame.secretWord.split('')).join(' ');
  }
  Logout() {
    this.authService.Logout();
  }
}
