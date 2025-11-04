import { Component } from '@angular/core';
import { GameStateService } from '../../../../core/services/game-state.service';

@Component({
  selector: 'app-player-stats-overview',
  imports: [],
  templateUrl: './player-stats-overview.component.html',
  styleUrl: './player-stats-overview.component.scss',
})
export class PlayerStatsOverviewComponent {
  constructor(private gameStateService: GameStateService) {}

  get mpi(): number {
    return this.gameStateService.impact()().mpi;
  }
}
