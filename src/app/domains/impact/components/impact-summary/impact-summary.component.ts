import { Component } from '@angular/core';
import { ImpactService } from '../../impact.service';
import { GameStateService } from '../../../../core/services/game-state.service';

@Component({
  selector: 'app-impact-summary',
  imports: [],
  templateUrl: './impact-summary.component.html',
  styleUrl: './impact-summary.component.scss',
})
export class ImpactSummaryComponent {
  constructor(private gameStateService: GameStateService) {}

  get pps() {
    return this.gameStateService.impact()().pps;
  }

  get mpi() {
    return this.gameStateService.impact()().mpi;
  }
}
