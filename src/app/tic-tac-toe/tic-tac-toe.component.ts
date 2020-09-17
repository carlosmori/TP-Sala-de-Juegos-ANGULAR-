import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  public nextMove: BehaviorSubject<string>;
  moves = 0;
  constructor() {
    this.nextMove = new BehaviorSubject('X');
  }
  matrix = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  ngOnInit(): void {}

  markSpot(row, col) {
    this.matrix[row][col] = this.nextMove.value;
    this.nextMove.value === 'X' ? this.nextMove.next('O') : this.nextMove.next('X');
    this.moves++;
    if (this.moves >= 5) {
      this.checkForWinners();
    }
  }

  checkForWinners() {
    // if (this.checkRow() || this.checkColumns() || this.checkDiagonals()) {
    if (this.checkRow() || this.checkColumns()) {
      alert('tateti');
    } else if (this.moves === 9) {
      alert('empate');
    } else {
      return false;
    }
  }

  checkRow() {
    for (let index = 0; index < this.matrix.length; index++) {
      const row = this.matrix[index];
      let XInRow = 0;
      let OInRow = 0;
      for (let index2 = 0; index2 < row.length; index2++) {
        const element = this.matrix[index][index2];
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
  checkColumns() {
    for (let index = 0; index < this.matrix.length; index++) {
      const row = this.matrix[index];
      let XInCol = 0;
      let OInCol = 0;
      for (let index2 = 0; index2 < row.length; index2++) {
        const element = this.matrix[index2][index];
        if (element === 'O') {
          OInCol++;
        }
        if (element === 'X') {
          XInCol++;
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
  // checkDiagonals() {
  //   const middleValue = this.matrix[1][1];
  //   middleValue

  // }
}
