import { Component, signal } from '@angular/core';
import { VerticalNavbarComponent } from './vertical-navbar/vertical-navbar.component';
import { ActionsPanelTab } from './actions-panel.model';
import { PlayerTabComponent } from './actions/player-tab/player-tab.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actions-panel',
  imports: [VerticalNavbarComponent, CommonModule],
  templateUrl: './actions-panel.component.html',
  styleUrl: './actions-panel.component.scss',
})
export class ActionsPanelComponent {
  tabs: ActionsPanelTab[] = [
    { id: 1, title: 'Test 1', component: PlayerTabComponent },
    { id: 2, title: 'Test 2', component: PlayerTabComponent },
    { id: 3, title: 'Test 3', component: PlayerTabComponent },
  ];
  activeTab = signal<ActionsPanelTab>(this.tabs[0]);

  switchTab(tab: ActionsPanelTab): void {
    this.activeTab.set(tab);
  }
}
