import { Component, HostListener } from '@angular/core';
import { ActionsPanelComponent } from './actions-panel/actions-panel.component';
import { CentralClickableAreaComponent } from './central-clickable-area/central-clickable-area.component';
import { RightSideDashboard } from './right-side-dashboard/right-side-dashboard.component';
import { GameLoopService } from '../../core/services/game-loop.service';

@Component({
  selector: 'app-game',
  imports: [RightSideDashboard, CentralClickableAreaComponent, ActionsPanelComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  constructor(private gameLoopService: GameLoopService) {}

  ngOnDestroy(): void {
    this.gameLoopService.stop();
  }

  @HostListener('window:beforeunload')
  handleUnload() {
    this.gameLoopService.stop();
  }
}
