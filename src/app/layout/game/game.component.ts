import { Component } from '@angular/core';
import { CentralClickableAreaComponent } from './central-clickable-area/central-clickable-area.component';
import { ActionsPanelComponent } from './actions-panel/actions-panel.component';
import { RightSideDashboard } from './right-side-dashboard/right-side-dashboard.component';
import { GameInitService } from '../../core/services/game-init.service';
import { GameStateService } from '../../core/services/game-state.service';

@Component({
  selector: 'app-game',
  imports: [RightSideDashboard, CentralClickableAreaComponent, ActionsPanelComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  constructor(
    private gameInitService: GameInitService,
    private gameStateService: GameStateService
  ) {}
}
