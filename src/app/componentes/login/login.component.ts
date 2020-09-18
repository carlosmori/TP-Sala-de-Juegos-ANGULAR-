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
  private subscription: Subscription;
  usuario = '';
  clave = '';
  progreso: number;
  progresoMensaje = 'esperando...';
  logeando = true;
  ProgresoDeAncho: string;

  clase = 'progress-bar progress-bar-info progress-bar-striped ';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {
    this.progreso = 0;
    this.ProgresoDeAncho = '0%';
  }

  ngOnInit() {}

  Entrar() {
    if (this.usuario === 'admin' && this.clave === 'admin') {
      this.router.navigate(['/Principal']);
    }
  }
  login() {
    this.authService.SignIn('admin@gmail.com', '123456');
  }
}
