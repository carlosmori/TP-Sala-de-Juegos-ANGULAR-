import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GameEnum } from '../../../clases/gameName.enum';
import { AuthService } from '../../../services/auth.service';
import { GamesService } from '../../../services/games.service';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  public nextMove: BehaviorSubject<string>;
  moves = 0;
  gameStarted: boolean;
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
    this.nextMove = new BehaviorSubject('X');
    this.gameStarted = false;
    this.enableReset = false;
  }
  matrix = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  ngOnInit(): void {
    const { uid, displayName } = this.authService.GetCurrentUser();
    this.currentUserId = uid;
    this.playerName = displayName;
    //@todo move name to GameEnum
    this.gameService
      .getGameIdByName({ name: GameEnum.TIC_TAC_TOE })
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
    this._snackBar.open('Here I would Reset', 'Ok', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
    // this.moves = 0;
    // this.matrix = [
    //   [null, null, null],
    //   [null, null, null],
    //   [null, null, null]
    // ];
  }

  Begin() {
    this.gameStarted = true;
  }
  MarkSpot(col, row) {
    if (this.matrix[col][row]) {
      return;
    }
    this.matrix[col][row] = this.nextMove.value;
    this.nextMove.value === 'X' ? this.nextMove.next('O') : this.nextMove.next('X');
    this.moves++;
    if (this.moves >= 5) {
      this.checkForWinners();
    }
  }

  checkForWinners() {
    if (this.checkRow() || this.checkCol() || this.checkDiagonals()) {
      this._snackBar.open('TaTeTi, Ganaste!', 'Ok', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
      this.enableReset = true;
    } else if (this.moves === 9) {
      this._snackBar.open('Es un empate!', 'Ok', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
      this.enableReset = true;
    } else {
      return false;
    }
  }

  checkCol() {
    for (let index = 0; index < this.matrix.length; index++) {
      const col = this.matrix[index];
      let XInCol = 0;
      let OInCol = 0;
      for (let index2 = 0; index2 < col.length; index2++) {
        const element = this.matrix[index][index2];
        if (element === 'O') {
          XInCol++;
        }
        if (element === 'X') {
          OInCol++;
        }
      }
      if (XInCol == 3 || OInCol === 3) {
        return true;
      } else {
        XInCol = 0;
        OInCol = 0;
      }
    }
  }
  checkRow() {
    for (let index = 0; index < this.matrix.length; index++) {
      const col = this.matrix[index];
      let XInRow = 0;
      let OInRow = 0;
      for (let index2 = 0; index2 < col.length; index2++) {
        const element = this.matrix[index2][index];
        if (element === 'O') {
          OInRow++;
        }
        if (element === 'X') {
          XInRow++;
        }
      }
      if (XInRow == 3 || OInRow === 3) {
        return true;
      } else {
        XInRow = 0;
        OInRow = 0;
      }
    }
  }
  checkDiagonals() {
    // First Diagonal
    if (this.matrix[0][0] === 'O' && this.matrix[1][1] === 'O' && this.matrix[2][2] === 'O') {
      return true;
    } else if (
      this.matrix[0][0] === 'X' &&
      this.matrix[1][1] === 'X' &&
      this.matrix[2][2] === 'X'
    ) {
      return true;
    }
    // Second Diagonal
    else if (this.matrix[0][2] === 'O' && this.matrix[1][1] === 'O' && this.matrix[2][0] === 'O') {
      return true;
    } else if (
      this.matrix[0][2] === 'X' &&
      this.matrix[1][1] === 'X' &&
      this.matrix[2][0] === 'X'
    ) {
      return true;
    }
    return false;
  }
  Logout() {
    this.authService.Logout();
  }
}
