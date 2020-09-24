import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  NgZone,
  OnChanges,
  OnInit
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-key-press',
  templateUrl: './key-press.component.html',
  styleUrls: ['./key-press.component.scss']
})
export class KeyPressComponent implements OnInit {
  timer: number;
  interval: any;
  interval2: any;
  displayCounter: boolean;
  displayMessage: boolean;
  keyPressCount: number;
  onKeydownHandler: any;
  timer2: number;

  constructor(public ngZone: NgZone, private _snackBar: MatSnackBar) {
    this.timer = 2;
    this.keyPressCount = 0;
    this.displayCounter = false;
    this.displayMessage = false;
  }

  ngOnInit(): void {}

  keyPress = (e) => {
    if (e.key == 'c') {
      this.ngZone.run(() => {
        this.keyPressCount++;
      });
    }
  };

  Begin() {
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer == 0) {
        clearInterval(this.interval);
        this.StartGame();
      }
    }, 1000);
  }

  StartGame() {
    this.displayCounter = true;
    this.timer = 3;
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('keypress', this.keyPress, false);
      this.interval = setInterval(() => {
        this.ngZone.run(() => {
          this.timer--;
        });
        if (this.timer == 0) {
          this.ngZone.run(() => {
            clearInterval(this.interval);
            document.removeEventListener('keypress', this.keyPress, false);
            this.displayMessage = true;
            this._snackBar.open('Here I would save the score from the player', 'Ok', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom'
            });
          });
        }
      }, 1000);
    });
  }
  PlayAgain() {
    this._snackBar.open('Here I would reset the game', 'Ok', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
}
