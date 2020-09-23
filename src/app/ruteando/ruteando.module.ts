import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importo del module principal
import { RouterModule, Routes } from '@angular/router';
import { AdivinaElNumeroComponent } from '../componentes/adivina-el-numero/adivina-el-numero.component';
import { ListadoDeResultadosComponent } from '../componentes/listado-de-resultados/listado-de-resultados.component';
import { LoginComponent } from '../componentes/login/login.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { PrincipalComponent } from '../componentes/principal/principal.component';
import { AgilidadAritmeticaComponent } from '../componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { AdivinaMasListadoComponent } from '../componentes/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadMasListadoComponent } from '../componentes/agilidad-mas-listado/agilidad-mas-listado.component';
import { ListadoComponent } from '../componentes/listado/listado.component';
import { ListadosComponent } from '../componentes/listados/listados.component';
import { JuegosComponent } from '../componentes/juegos/juegos.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { MenuCardComponent } from '../componentes/menu-card/menu-card.component';
import { CabeceraComponent } from '../componentes/cabecera/cabecera.component';
import { QuienSoyComponent } from '../componentes/quien-soy/quien-soy.component';
import { ListadoDePaisesComponent } from '../componentes/listado-de-paises/listado-de-paises.component';
import { JugadoresListadoComponent } from '../componentes/jugadores-listado/jugadores-listado.component';
import { PiedraPapelTijeraComponent } from '../componentes/piedra-papel-tijera/piedra-papel-tijera.component';
import { AnagramaComponent } from '../componentes/anagrama/anagrama.component';
import { MemoTestComponent } from '../componentes/memo-test/memo-test.component';
import { TicTacToeComponent } from '../componentes/tic-tac-toe/tic-tac-toe.component';
import { AuthGuard } from '../auth/auth.guard';

// declaro donde quiero que se dirija
const MiRuteo = [
  {
    path: 'Jugadores',
    component: JugadoresListadoComponent,
    canActivate: [AuthGuard]
  },
  { path: '', component: PrincipalComponent, canActivate: [AuthGuard] },
  { path: 'Login', component: LoginComponent, canActivate: [AuthGuard] },
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
      { path: 'Adivina', component: AdivinaElNumeroComponent },
      { path: 'AdivinaMasListado', component: AdivinaMasListadoComponent },
      { path: 'AgilidadaMasListado', component: AgilidadMasListadoComponent },
      { path: 'Agilidad', component: AgilidadAritmeticaComponent },
      { path: 'PiedraPapelTijera', component: PiedraPapelTijeraComponent },
      { path: 'Anagrama', component: AnagramaComponent },
      { path: 'MemoTest', component: MemoTestComponent },
      { path: 'TicTacToe', component: TicTacToeComponent }
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
      { path: 'Adivina', component: AdivinaElNumeroComponent },
      { path: 'AdivinaMasListado', component: AdivinaMasListadoComponent },
      { path: 'AgilidadaMasListado', component: AgilidadMasListadoComponent },
      { path: 'Agilidad', component: AgilidadAritmeticaComponent },
      { path: 'PiedraPapelTijera', component: PiedraPapelTijeraComponent },
      { path: 'Anagrama', component: AnagramaComponent },
      { path: 'MemoTest', component: MemoTestComponent },
      { path: 'TicTacToe', component: TicTacToeComponent }
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
