import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnChanges,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-key-press-counter',
  templateUrl: './key-press-counter.component.html',
  styleUrls: ['./key-press-counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyPressCounterComponent implements OnInit, AfterViewChecked {
  keyPressCount = 0;
  // @Input() counter;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit(): void {}

  onKeyPress(event) {}

  ngAfterViewChecked() {
    console.log('child');
  }
}
