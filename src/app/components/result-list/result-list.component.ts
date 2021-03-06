import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { GamesService } from '../../services/games.service';
import { of, forkJoin, Observable } from 'rxjs';
import { map, switchMap, combineLatest } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
export interface GameResult {
  photoUrl: string;
  name: string;
  email: string;
  sexo: string;
  cuit: string;
  result: number;
}
@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
  displayedColumns: string[] = ['photoURL', 'name', 'email', 'sexo', 'cuit', 'result'];
  dataSource: MatTableDataSource<GameResult>;
  @ViewChild(MatSort) sort: MatSort;
  gamesList: any[];
  currentGameResults: any[];
  users: any;
  loading: boolean;

  constructor(
    private authService: AuthService,
    private gameService: GamesService,
    private userService: UserService
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.gameService.getGames().subscribe((gamesList) => {
      this.gamesList = gamesList;
    });
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }
  populateTable(game) {
    this.loading = true;
    this.gameService.getAllGameResults({ gameId: game.gameId }).subscribe((results) => {
      this.currentGameResults = results.map((result) => {
        const userInfo = this.users.find((user) => user.uid == result.userId);
        return { ...result, ...userInfo };
      });
      this.dataSource = new MatTableDataSource(this.currentGameResults);
      this.loading = false;
    });
  }
  Logout() {
    this.authService.Logout();
  }
}
