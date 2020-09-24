export class JuegoAdivina {
  secretNumber;
  inputNumber: number;
  constructor() {}

  public verificar() {
    return this.inputNumber == this.secretNumber;
  }
  public generateSecretNumber() {
    this.secretNumber = 1 + Math.floor((100 - 1) * Math.random());
    console.info('numero Secreto:' + this.secretNumber);
  }
  public throwHint() {
    if (this.inputNumber < this.secretNumber) {
      return `it's greater`;
    }
    return `it's smaller`;
  }
}
