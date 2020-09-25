export class MemoTestGame {
  public numberList: number[];
  won: boolean;
  constructor() {
    this.won = false;
  }

  checkSequence(userSequence) {
    let stringNumberList = '';
    this.numberList.forEach((number) => {
      stringNumberList = stringNumberList.concat(number.toString());
    });
    return stringNumberList === userSequence.toString();
  }
}
