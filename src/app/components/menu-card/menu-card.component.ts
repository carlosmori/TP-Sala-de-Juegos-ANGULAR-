import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  Juego(tipo: string) {
    switch (tipo) {
      case 'KeyPress':
        this.router.navigate(['/Games/KeyPress']);
        break;
      case 'TicTacToe':
        this.router.navigate(['/Games/TicTacToe']);
        break;
      case 'MemoTest':
        this.router.navigate(['/Games/MemoTest']);
        break;
      case 'Anagrama':
        this.router.navigate(['/Games/Anagrama']);
        break;
      case 'Adivina':
        this.router.navigate(['/Games/Adivina']);
        break;
      case 'PiedraPapelTijera':
        this.router.navigate(['/Games/PiedraPapelTijera']);
        break;
      case 'Agilidad':
        this.router.navigate(['/Games/Agilidad']);
        break;
      case 'AdivinaMasListado':
        this.router.navigate(['/Games/AdivinaMasListado']);
        break;
      case 'AgilidadaMasListado':
        this.router.navigate(['/Games/AgilidadaMasListado']);
        break;
    }
  }
  Logout() {
    this.authService.Logout();
  }
}
