import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { GuessTheNumberComponent } from './components/games/guess-the-number/guess-the-number.component';
import { LoginComponent } from './components/login/login.component';
import { HttpModule } from '@angular/http';
import { MiHttpService } from './servicios/mi-http/mi-http.service';
import { PaisesService } from './servicios/paises.service';
import { JugadoresService } from './servicios/jugadores.service';
import { ArchivosJugadoresService } from './servicios/archivos-jugadores.service';
import { ErrorComponent } from './components/error/error.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { MathAgilityComponent } from './components/games/math-agility/math-agility.component';
import { RuteandoModule } from './routing/routing.module';
import { JuegoServiceService } from './servicios/juego-service.service';
import { JuegosComponent } from './components/juegos/juegos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { AnagramComponent } from './components/games/anagram/anagram.component';
import { SexoPipe } from './pipes/sexo.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RockPaperScissorsComponent } from './components/games/rock-paper-scissors/rock-paper-scissors.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { MemoTestComponent } from './components/games/memo-test/memo-test.component';
import { TicTacToeComponent } from './components/games/tic-tac-toe/tic-tac-toe.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { KeyPressComponent } from './components/games/key-press/key-press.component';
import { ResultListComponent } from './components/result-list/result-list.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import { GameNamePipe } from './pipes/game-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GuessTheNumberComponent,
    ErrorComponent,
    PrincipalComponent,
    LoginComponent,
    MathAgilityComponent,
    JuegosComponent,
    RegistroComponent,
    MenuCardComponent,
    CabeceraComponent,
    QuienSoyComponent,
    AnagramComponent,
    SexoPipe,
    RockPaperScissorsComponent,
    MemoTestComponent,
    TicTacToeComponent,
    KeyPressComponent,
    ResultListComponent,
    PlayersListComponent,
    GameNamePipe
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
