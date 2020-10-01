import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.scss']
})
export class QuienSoyComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}
  Logout() {
    this.authService.Logout();
  }
}
