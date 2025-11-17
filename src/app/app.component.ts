import { Component, NgZone, OnInit } from '@angular/core';
import { GameComponent } from './layout/game/game.component';

@Component({
  selector: 'app-root',
  imports: [GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private zone: NgZone) {
    this.zone.onUnstable.subscribe(() =>
      console.log('%c[Zone] -> Angular detected async event (entering zone)', 'color: red;')
    );
    this.zone.onStable.subscribe(() =>
      console.log('%c[Zone] <- Angular stable (after CD)', 'color: green;')
    );
  }
}
