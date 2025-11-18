import { Component } from '@angular/core';
import { CentralClickableAreaComponent } from './central-clickable-area/central-clickable-area.component';
import { ActionsPanelComponent } from './actions-panel/actions-panel.component';
import { RightSideDashboard } from './right-side-dashboard/right-side-dashboard.component';

@Component({
  selector: 'app-game',
  imports: [RightSideDashboard, CentralClickableAreaComponent, ActionsPanelComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {}
