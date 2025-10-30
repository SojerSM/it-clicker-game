import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { LeftSidePanelComponent } from './left-side-panel/left-side-panel.component';
import { CentralClickableAreaComponent } from './central-clickable-area/central-clickable-area.component';
import { ActionsPanelComponent } from './actions-panel/actions-panel.component';

@Component({
  selector: 'app-game',
  imports: [
    HeaderComponent,
    LeftSidePanelComponent,
    CentralClickableAreaComponent,
    ActionsPanelComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {}
