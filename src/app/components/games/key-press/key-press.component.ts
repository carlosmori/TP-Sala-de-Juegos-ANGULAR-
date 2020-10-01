import { Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GamesService } from '../../../services/games.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-key-press',
  templateUrl: './key-press.component.html',
  styleUrls: ['./key-press.component.scss']
})
export class KeyPressComponent implements OnInit {
  timer: number;
  interval: any;
  interval2: any;
  displayCounter: boolean;
  displayMessage: boolean;
  keyPressCount: number;
  onKeydownHandler: any;
  timer2: number;
  gameId: any;
  score: number;
  userId: any;
  resultId: any;
  currentUserId: any;

  constructor(
    public ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private gameService: GamesService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.timer = 2;
    this.keyPressCount = 0;
    this.displayCounter = false;
    this.displayMessage = false;
  }

  ngOnInit(): void {
    console.log(this.userService.currentUser);
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
          userId: 'oBX7liSdgQbqmEgmkVWa3isgLSg2'
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

  keyPress = (e) => {
    if (e.key == 'c') {
      this.ngZone.run(() => {
        this.keyPressCount++;
      });
    }
  };

  Begin() {
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer == 0) {
        clearInterval(this.interval);
        this.StartGame();
      }
    }, 1000);
  }

  StartGame() {
    this.displayCounter = true;
    this.timer = 3;
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('keypress', this.keyPress, false);
      this.interval = setInterval(() => {
        this.ngZone.run(() => {
          this.timer--;
        });
        if (this.timer == 0) {
          this.ngZone.run(() => {
            clearInterval(this.interval);
            document.removeEventListener('keypress', this.keyPress, false);
            this.checkResult();
          });
        }
      }, 1000);
    });
  }
  checkResult() {
    if (this.keyPressCount > this.score) {
      this.gameService.updateScoreByUserId({ resultId: this.resultId, result: this.keyPressCount });
      this._snackBar.open('Congrats you beat your own mark!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    } else {
      this._snackBar.open('You almost beat your last score, best luck next time', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }
    this.resetGame();
  }
  resetGame() {
    this.timer = 2;
    this.keyPressCount = 0;
    this.displayCounter = false;
    this.displayMessage = false;
  }
  PlayAgain() {
    this._snackBar.open('Here I would reset the game', 'Ok', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
  Logout() {
    this.authService.Logout();
  }
}
