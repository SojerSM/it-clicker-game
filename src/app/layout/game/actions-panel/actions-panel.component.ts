import { Component, signal } from '@angular/core';
import { VerticalNavbarComponent } from './vertical-navbar/vertical-navbar.component';
import { ActionsPanelTab } from './actions-panel.model';

@Component({
  selector: 'app-actions-panel',
  imports: [VerticalNavbarComponent],
  templateUrl: './actions-panel.component.html',
  styleUrl: './actions-panel.component.scss',
})
export class ActionsPanelComponent {
  tabs: ActionsPanelTab[] = [
    { id: 1, title: 'Test 1' },
    { id: 2, title: 'Test 2' },
    { id: 3, title: 'Test 3' },
  ];
  activeTab = signal<ActionsPanelTab>(this.tabs[0]);

  switchTab(tab: ActionsPanelTab): void {
    this.activeTab.update(() => tab);
  }
}
