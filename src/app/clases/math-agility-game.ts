export class MathAgilityGame {
  firstNumber: number;
  secondNumber: number;
  operators: string[];
  selectedOperator: string;
  result: number;
  inputNumber: number;
  won: boolean;
  constructor() {
    this.operators = ['+', '-', '*'];
    this.won = false;
  }
}
