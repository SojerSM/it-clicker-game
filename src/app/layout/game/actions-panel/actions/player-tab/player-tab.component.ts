import { Component } from '@angular/core';
import { PlayerInfoComponent } from '../../../../../domains/player/components/player-info/player-info.component';
import { PlayerStatsOverviewComponent } from '../../../../../domains/player/components/player-stats-overview/player-stats-overview.component';

@Component({
  selector: 'app-player-tab',
  imports: [PlayerInfoComponent, PlayerStatsOverviewComponent],
  templateUrl: './player-tab.component.html',
  styleUrl: './player-tab.component.scss',
})
export class PlayerTabComponent {}
