import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importo del module principal
import { RouterModule, Routes } from '@angular/router';
import { GuessTheNumberComponent } from '../components/games/guess-the-number/guess-the-number.component';
import { LoginComponent } from '../components/login/login.component';
import { ErrorComponent } from '../components/error/error.component';
import { PrincipalComponent } from '../components/principal/principal.component';
import { MathAgilityComponent } from '../components/games/math-agility/math-agility.component';
import { JuegosComponent } from '../components/juegos/juegos.component';
import { RegistroComponent } from '../components/registro/registro.component';
import { MenuCardComponent } from '../components/menu-card/menu-card.component';
import { CabeceraComponent } from '../components/cabecera/cabecera.component';
import { QuienSoyComponent } from '../components/quien-soy/quien-soy.component';
import { RockPaperScissorsComponent } from '../components/games/rock-paper-scissors/rock-paper-scissors.component';
import { AnagramComponent } from '../components/games/anagram/anagram.component';
import { MemoTestComponent } from '../components/games/memo-test/memo-test.component';
import { TicTacToeComponent } from '../components/games/tic-tac-toe/tic-tac-toe.component';
import { AuthGuard } from '../auth/auth.guard';
import { KeyPressComponent } from '../components/games/key-press/key-press.component';
import { ResultListComponent } from '../components/result-list/result-list.component';
import { PlayersListComponent } from '../components/players-list/players-list.component';

// declaro donde quiero que se dirija
const MiRuteo = [
  { path: '', component: PrincipalComponent, canActivate: [AuthGuard] },
  { path: 'Login', component: LoginComponent },
  { path: 'QuienSoy', component: QuienSoyComponent, canActivate: [AuthGuard] },
  { path: 'Registro', component: RegistroComponent, canActivate: [AuthGuard] },
  { path: 'Principal', component: PrincipalComponent, canActivate: [AuthGuard] },

  {
    path: 'Juegos',
    component: JuegosComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MenuCardComponent },
      { path: 'Adivina', component: GuessTheNumberComponent },
      { path: 'Agilidad', component: MathAgilityComponent },
      { path: 'PiedraPapelTijera', component: RockPaperScissorsComponent },
      { path: 'Anagrama', component: AnagramComponent },
      { path: 'MemoTest', component: MemoTestComponent },
      { path: 'TicTacToe', component: TicTacToeComponent },
      { path: 'KeyPress', component: KeyPressComponent }
    ]
  },
  { path: '**', component: ErrorComponent },
  { path: 'error', component: ErrorComponent }
];

const routingDevMode = [
  { path: '', component: PrincipalComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'QuienSoy', component: QuienSoyComponent },
  { path: 'Registro', component: RegistroComponent },
  { path: 'Principal', component: PrincipalComponent },
  { path: 'ResultList', component: ResultListComponent },
  { path: 'PlayerList', component: PlayersListComponent },

  {
    path: 'Games',
    component: JuegosComponent,
    children: [
      { path: '', component: MenuCardComponent },
      { path: 'Adivina', component: GuessTheNumberComponent },
      { path: 'Agilidad', component: MathAgilityComponent },
      { path: 'PiedraPapelTijera', component: RockPaperScissorsComponent },
      { path: 'Anagrama', component: AnagramComponent },
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
