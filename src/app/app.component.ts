import { Component, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
