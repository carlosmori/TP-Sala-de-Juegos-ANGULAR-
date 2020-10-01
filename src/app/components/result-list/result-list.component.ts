import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
  gamesList: any[];
  constructor(private authService: AuthService, private gameService: GamesService) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe((gamesList) => {
      this.gamesList = gamesList;
    });
  }
  populateTable(game) {
    console.log(game);
  }
  Logout() {
    this.authService.Logout();
  }
}
