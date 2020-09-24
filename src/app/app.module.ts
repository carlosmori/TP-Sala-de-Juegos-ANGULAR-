import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { GuessTheNumberComponent } from './components/guess-the-number/guess-the-number.component';
import { ListadoDeResultadosComponent } from './components/listado-de-resultados/listado-de-resultados.component';
import { LoginComponent } from './components/login/login.component';
import { HttpModule } from '@angular/http';
import { MiHttpService } from './servicios/mi-http/mi-http.service';
import { PaisesService } from './servicios/paises.service';
import { JugadoresService } from './servicios/jugadores.service';
import { ArchivosJugadoresService } from './servicios/archivos-jugadores.service';
import { ErrorComponent } from './components/error/error.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { AgilidadAritmeticaComponent } from './components/agilidad-aritmetica/agilidad-aritmetica.component';
import { AdivinaMasListadoComponent } from './components/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadMasListadoComponent } from './components/agilidad-mas-listado/agilidad-mas-listado.component';
import { RuteandoModule } from './routing/routing.module';
import { ListadoComponent } from './components/listado/listado.component';
import { JugadoresListadoComponent } from './components/jugadores-listado/jugadores-listado.component';
import { JuegoServiceService } from './servicios/juego-service.service';
import { ListadosComponent } from './components/listados/listados.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { AnagramaComponent } from './components/anagrama/anagrama.component';
import { ListadoDePaisesComponent } from './components/listado-de-paises/listado-de-paises.component';
import { InputJugadoresComponent } from './components/input-jugadores/input-jugadores.component';
import { SexoPipe } from './pipes/sexo.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PiedraPapelTijeraComponent } from './components/piedra-papel-tijera/piedra-papel-tijera.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { MemoTestComponent } from './components/memo-test/memo-test.component';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { KeyPressComponent } from './key-press/key-press.component';

@NgModule({
  declarations: [
    AppComponent,
    GuessTheNumberComponent,
    ListadoDeResultadosComponent,
    ErrorComponent,
    PrincipalComponent,
    LoginComponent,
    AgilidadAritmeticaComponent,
    AdivinaMasListadoComponent,
    AgilidadMasListadoComponent,
    ListadoComponent,
    ListadosComponent,
    JuegosComponent,
    RegistroComponent,
    MenuCardComponent,
    CabeceraComponent,
    QuienSoyComponent,
    AnagramaComponent,
    ListadoDePaisesComponent,
    JugadoresListadoComponent,
    InputJugadoresComponent,
    SexoPipe,
    PiedraPapelTijeraComponent,
    MemoTestComponent,
    TicTacToeComponent,
    KeyPressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RuteandoModule,
    HttpModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    JuegoServiceService,
    MiHttpService,
    PaisesService,
    ArchivosJugadoresService,
    JugadoresService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
