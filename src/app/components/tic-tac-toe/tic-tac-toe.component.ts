import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  public nextMove: BehaviorSubject<string>;
  moves = 0;
  constructor(private _snackBar: MatSnackBar) {
    this.nextMove = new BehaviorSubject('X');
  }
  matrix = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  ngOnInit(): void {}

  markSpot(col, row) {
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
      this.resetGame();
    } else if (this.moves === 9) {
      this._snackBar.open('Es un empate!', 'Ok', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
      this.resetGame();
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
  resetGame() {
    this.moves = 0;
    this.matrix = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
  }
}
