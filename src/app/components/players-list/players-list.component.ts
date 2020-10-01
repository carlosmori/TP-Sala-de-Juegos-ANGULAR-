import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {
  displayedColumns: string[] = ['photoURL', 'name', 'email', 'sexo', 'cuit'];
  @ViewChild(MatSort) sort: MatSort;

  public users: any = [];
  userList = [];
  dataSource: MatTableDataSource<any>;
  loading: boolean;
  constructor(private userService: UserService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.userList = users;
      this.dataSource = new MatTableDataSource(users);
      this.loading = false;
    });
  }
}
