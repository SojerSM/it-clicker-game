import { Component } from '@angular/core';
import { PlayerInfoComponent } from '../../../../../domains/player/components/player-info/player-info.component';

@Component({
  selector: 'app-player-tab',
  imports: [PlayerInfoComponent],
  templateUrl: './player-tab.component.html',
  styleUrl: './player-tab.component.scss',
})
export class PlayerTabComponent {}
