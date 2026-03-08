import { Component } from '@angular/core';
import { GameStateService } from '../../../../core/services/game-state.service';
import { StatisticState } from '../../../../core/types/state.model';

@Component({
  selector: 'app-global-stats-overview',
  imports: [],
  templateUrl: './global-stats-overview.component.html',
  styleUrl: './global-stats-overview.component.scss',
})
export class GlobalStatsOverviewComponent {
  constructor(private gameStateService: GameStateService) {}

  get statistics(): StatisticState {
    return this.gameStateService.statisticState();
  }
}
