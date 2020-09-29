import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  clase = 'progress-bar progress-bar-info progress-bar-striped ';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {
    this.email = '';
    this.password = '';
  }

  ngOnInit() {}

  Login(email, password) {
    this.authService.Login(email, password);
  }
  FillCredentials(email, password) {
    this.email = email;
    this.password = password;
  }
}
