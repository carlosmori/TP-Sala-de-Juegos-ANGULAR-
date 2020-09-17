import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  constructor(private router: Router) {}

  ngOnInit() {}

  redirect(direccion) {
    switch (direccion) {
      case 'Juegos':
        this.router.navigate(['/Juegos']);
        break;
      case 'Listado':
        this.router.navigate(['/Listado']);
        break;
      case 'Configuracion':
        this.router.navigate(['/Configuracion']);
        break;
      case 'Jugadores':
        this.router.navigate(['/Jugadores']);
        break;
    }
  }
}
