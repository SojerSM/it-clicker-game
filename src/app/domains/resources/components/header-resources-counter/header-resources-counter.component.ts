import { Component } from '@angular/core';
import { NumberFormat } from '../../../../core/pipes/number-format.pipe';
import { GameStateService } from '../../../../core/services/game-state.service';

@Component({
  selector: 'app-header-resources-counter',
  imports: [NumberFormat],
  templateUrl: './header-resources-counter.component.html',
  styleUrl: './header-resources-counter.component.scss',
})
export class HeaderResourcesCounterComponent {
  constructor(private gameStateService: GameStateService) {}

  get money() {
    return this.gameStateService.resources()().money;
  }

  get exp() {
    return this.gameStateService.resources()().exp;
  }
}
