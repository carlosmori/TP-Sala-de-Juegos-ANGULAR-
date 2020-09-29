import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    console.log(this.authService.userData);
  }

  redirect(direccion) {
    switch (direccion) {
      case 'Games':
        this.router.navigate(['/Games']);
        break;
      case 'Results':
        this.router.navigate(['/ResultList']);
        break;
      case 'Players':
        this.router.navigate(['/PlayerList']);
        break;
    }
  }
}
