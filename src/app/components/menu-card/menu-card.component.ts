import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  Juego(tipo: string) {
    switch (tipo) {
      case 'KeyPress':
        this.router.navigate(['/Juegos/KeyPress']);
        break;
      case 'TicTacToe':
        this.router.navigate(['/Juegos/TicTacToe']);
        break;
      case 'MemoTest':
        this.router.navigate(['/Juegos/MemoTest']);
        break;
      case 'Anagrama':
        this.router.navigate(['/Juegos/Anagrama']);
        break;
      case 'Adivina':
        this.router.navigate(['/Juegos/Adivina']);
        break;
      case 'PiedraPapelTijera':
        this.router.navigate(['/Juegos/PiedraPapelTijera']);
        break;
      case 'Agilidad':
        this.router.navigate(['/Juegos/Agilidad']);
        break;
      case 'AdivinaMasListado':
        this.router.navigate(['/Juegos/AdivinaMasListado']);
        break;
      case 'AgilidadaMasListado':
        this.router.navigate(['/Juegos/AgilidadaMasListado']);
        break;
    }
  }
}
