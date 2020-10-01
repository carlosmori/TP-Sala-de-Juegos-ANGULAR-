import { Pipe, PipeTransform } from '@angular/core';
import { GameEnum } from '../clases/gameName.enum';
@Pipe({
  name: 'gameName'
})
export class GameNamePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case GameEnum.TIC_TAC_TOE:
        return 'TicTacToe';
        break;
      case GameEnum.ROCK_PAPER_SCISSORS:
        return 'Rock Paper Scissors';
        break;
      case GameEnum.MEMO_TEST:
        return 'Memo-Test';
        break;
      case GameEnum.MATH_AGILITY:
        return 'Math Agility';
        break;
      case GameEnum.KEY_PRESS:
        return 'Key Press';
        break;
      case GameEnum.GUESS_THE_NUMBER:
        return 'Guess The Number';
        break;
      case GameEnum.ANAGRAM:
        return 'Anagram';
        break;

      default:
        break;
    }
    return null;
  }
}
