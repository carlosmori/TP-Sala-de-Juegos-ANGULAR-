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
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-key-press',
  templateUrl: './key-press.component.html',
  styleUrls: ['./key-press.component.scss']
})
export class KeyPressComponent implements OnInit, AfterViewChecked {
  timer: number;
  interval: any;
  interval2: any;
  displayCount: boolean;
  keyPressCount: number;
  onKeydownHandler: any;
  timer2: number;

  constructor(private cdr: ChangeDetectorRef, public ngZone: NgZone) {
    this.timer = 5;
    this.keyPressCount = 0;
    this.displayCount = false;
  }

  ngOnInit(): void {}

  keyPress(e) {
    if (e.key == 'c') {
      this.ngZone.run(() => {
        this.keyPressCount++;
      });
    }
  }

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
    this.displayCount = true;
    this.timer2 = 10;
    clearInterval(this.interval);
    this.ngZone.runOutsideAngular(() => {
      clearInterval(this.interval);
      document.addEventListener('keypress', this.keyPress.bind(this));
      this.interval2 = setInterval(() => {
        this.ngZone.run(() => {
          this.timer2--;
        });
        if (this.timer2 == 0) {
          this.ngZone.run(() => {
            clearInterval(this.interval2);
            //document.removeEventListener('keypress', () => {});
          });
        }
      }, 1000);
    });
  }
  ngAfterViewChecked() {
    console.log('parent');
  }
}
