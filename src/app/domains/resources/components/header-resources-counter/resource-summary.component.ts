import { Component } from '@angular/core';
import { NumberFormat } from '../../../../core/pipes/number-format.pipe';
import { GameStateService } from '../../../../core/services/game-state.service';

@Component({
  selector: 'app-resource-summary',
  imports: [NumberFormat],
  templateUrl: './resource-summary.component.html',
  styleUrl: './resource-summary.component.scss',
})
export class ResourceSummaryComponent {
  constructor(private gameStateService: GameStateService) {}

  get money() {
    return this.gameStateService.resources()().money;
  }

  get exp() {
    return this.gameStateService.resources()().exp;
  }
}
