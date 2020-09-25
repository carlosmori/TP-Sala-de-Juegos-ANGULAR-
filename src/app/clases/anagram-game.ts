export class AnagramGame {
  secretWord: string;
  wordList: string[];
  constructor() {
    this.wordList = ['Odontologo', 'Clinica', 'Gatos', 'Perros', 'Monitor', 'Estrella', 'Galaxia'];
  }

  public checkWord(userWord) {
    return userWord.toLowerCase() === this.secretWord.toLowerCase();
  }
}
