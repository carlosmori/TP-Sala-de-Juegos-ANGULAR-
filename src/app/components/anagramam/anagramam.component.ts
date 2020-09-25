import { Component, OnInit } from '@angular/core';
import { Juego } from '../../clases/juego';
import { AnagramGame } from '../../clases/anagram-game';
import { randomInt } from '../../../utils/randomIntGenerator.js';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-anagramam',
  templateUrl: './anagramam.component.html',
  styleUrls: ['./anagramam.component.scss']
})
export class AnagramamComponent implements OnInit {
  newGame: AnagramGame;
  unorderedWord: any;
  userWord: string;
  attempts: number;
  disableButton: boolean;
  enableReset: boolean;
  gameStarted: boolean;

  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  constructor(private _snackBar: MatSnackBar) {
    this.unorderedWord = null;
    this.userWord = '';
    this.attempts = 0;
    this.disableButton = false;
    this.enableReset = false;
    this.gameStarted = false;
    this.newGame = new AnagramGame();
    const secretWord = this.newGame.wordList[randomInt(0, this.newGame.wordList.length)];
    this.newGame.secretWord = secretWord;
    this.unorderedWord = this.shuffle(this.newGame.secretWord.split(''));
  }

  ngOnInit() {
    this.unorderedWord = this.unorderedWord.join(' ');
    console.log(this.newGame.secretWord);
  }
  Begin() {
    this.gameStarted = true;
  }
  CheckWord(userWord: string) {
    this.attempts++;
    if (this.newGame.checkWord(userWord)) {
      this._snackBar.open('You won, congratulations!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
      this.enableReset = true;
    } else {
      if (this.attempts === 3) {
        this.disableButton = true;
        this.enableReset = true;
        this._snackBar.open('Maybe next time pill!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
        return;
      }
      this._snackBar.open('Keep trying!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }
  }
  Reset() {
    this._snackBar.open('Here I would reset the game', 'Ok', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
}
