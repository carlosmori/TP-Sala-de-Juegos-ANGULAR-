export class GameRockPaperScissors {
  playerScore: number;
  machineScore: number;
  playerwon: boolean;
  machineWon: boolean;
  constructor() {
    this.playerScore = 0;
    this.machineScore = 0;
    this.playerwon = false;
    this.machineWon = false;
  }
  public checkMatch(machinePick, playerPick) {
    console.log(machinePick);
    console.log(playerPick);
    const processResult = (3 + machinePick - playerPick) % 3;
    if (!processResult) {
      return 'Draw';
    } else if (1 == processResult) {
      return 'Win';
    } else {
      return 'Loose';
    }
  }
  public checkGame() {
    if (this.playerScore >= 3) {
      this.playerwon = true;
    }
    if (this.machineScore >= 3) {
      this.machineWon = true;
    }
  }
}
