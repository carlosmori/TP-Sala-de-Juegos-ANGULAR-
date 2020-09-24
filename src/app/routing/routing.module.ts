import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importo del module principal
import { RouterModule, Routes } from '@angular/router';
import { GuessTheNumberComponent } from '../components/guess-the-number/guess-the-number.component';
import { ListadoDeResultadosComponent } from '../components/listado-de-resultados/listado-de-resultados.component';
import { LoginComponent } from '../components/login/login.component';
import { ErrorComponent } from '../components/error/error.component';
import { PrincipalComponent } from '../components/principal/principal.component';
import { AgilidadAritmeticaComponent } from '../components/agilidad-aritmetica/agilidad-aritmetica.component';
import { AdivinaMasListadoComponent } from '../components/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadMasListadoComponent } from '../components/agilidad-mas-listado/agilidad-mas-listado.component';
import { ListadoComponent } from '../components/listado/listado.component';
import { ListadosComponent } from '../components/listados/listados.component';
import { JuegosComponent } from '../components/juegos/juegos.component';
import { RegistroComponent } from '../components/registro/registro.component';
import { MenuCardComponent } from '../components/menu-card/menu-card.component';
import { CabeceraComponent } from '../components/cabecera/cabecera.component';
import { QuienSoyComponent } from '../components/quien-soy/quien-soy.component';
import { ListadoDePaisesComponent } from '../components/listado-de-paises/listado-de-paises.component';
import { JugadoresListadoComponent } from '../components/jugadores-listado/jugadores-listado.component';
import { RockPaperScissorsComponent } from '../components/rock-paper-scissors/rock-paper-scissors.component';
import { AnagramaComponent } from '../components/anagrama/anagrama.component';
import { MemoTestComponent } from '../components/memo-test/memo-test.component';
import { TicTacToeComponent } from '../components/tic-tac-toe/tic-tac-toe.component';
import { AuthGuard } from '../auth/auth.guard';
import { KeyPressComponent } from '../key-press/key-press.component';

// declaro donde quiero que se dirija
const MiRuteo = [
  {
    path: 'Jugadores',
    component: JugadoresListadoComponent,
    canActivate: [AuthGuard]
  },
  { path: '', component: PrincipalComponent, canActivate: [AuthGuard] },
  { path: 'Login', component: LoginComponent },
  { path: 'QuienSoy', component: QuienSoyComponent, canActivate: [AuthGuard] },
  { path: 'Registro', component: RegistroComponent, canActivate: [AuthGuard] },
  { path: 'Principal', component: PrincipalComponent, canActivate: [AuthGuard] },
  { path: 'Listado', component: ListadoComponent, canActivate: [AuthGuard] },
  { path: 'Paises', component: ListadoDePaisesComponent, canActivate: [AuthGuard] },

  {
    path: 'Juegos',
    component: JuegosComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MenuCardComponent },
      { path: 'Adivina', component: GuessTheNumberComponent },
      { path: 'AdivinaMasListado', component: AdivinaMasListadoComponent },
      { path: 'AgilidadaMasListado', component: AgilidadMasListadoComponent },
      { path: 'Agilidad', component: AgilidadAritmeticaComponent },
      { path: 'PiedraPapelTijera', component: RockPaperScissorsComponent },
      { path: 'Anagrama', component: AnagramaComponent },
      { path: 'MemoTest', component: MemoTestComponent },
      { path: 'TicTacToe', component: TicTacToeComponent },
      { path: 'KeyPress', component: KeyPressComponent }
    ]
  },
  { path: '**', component: ErrorComponent },
  { path: 'error', component: ErrorComponent }
];

const routingDevMode = [
  {
    path: 'Jugadores',
    component: JugadoresListadoComponent
  },
  { path: '', component: PrincipalComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'QuienSoy', component: QuienSoyComponent },
  { path: 'Registro', component: RegistroComponent },
  { path: 'Principal', component: PrincipalComponent },
  { path: 'Listado', component: ListadoComponent },
  { path: 'Paises', component: ListadoDePaisesComponent },

  {
    path: 'Juegos',
    component: JuegosComponent,
    children: [
      { path: '', component: MenuCardComponent },
      { path: 'Adivina', component: GuessTheNumberComponent },
      { path: 'AdivinaMasListado', component: AdivinaMasListadoComponent },
      { path: 'AgilidadaMasListado', component: AgilidadMasListadoComponent },
      { path: 'Agilidad', component: AgilidadAritmeticaComponent },
      { path: 'PiedraPapelTijera', component: RockPaperScissorsComponent },
      { path: 'Anagrama', component: AnagramaComponent },
      { path: 'MemoTest', component: MemoTestComponent },
      { path: 'TicTacToe', component: TicTacToeComponent },
      { path: 'KeyPress', component: KeyPressComponent }
    ]
  },
  { path: '**', component: ErrorComponent },
  { path: 'error', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routingDevMode)],
  exports: [RouterModule]
})
export class RuteandoModule {}
