import { Component, signal } from '@angular/core';
import { VerticalNavbarComponent } from './vertical-navbar/vertical-navbar.component';
import { Tab } from '../../../shared/types/tab';
import { CommonModule } from '@angular/common';
import { HeroActionsComponent } from './actions/hero-actions/hero-actions.component';
import { ProjectProgressComponent } from '../../../domains/progress/projects/components/progress-header/project-progress.component';

@Component({
  selector: 'app-actions-panel',
  imports: [VerticalNavbarComponent, CommonModule, ProjectProgressComponent],
  templateUrl: './actions-panel.component.html',
  styleUrl: './actions-panel.component.scss',
})
export class ActionsPanelComponent {
  tabs: Tab[] = [{ id: 1, title: 'Test 1', component: HeroActionsComponent }];

  activeTab = signal<Tab>(this.tabs[0]);

  switchTab(tab: Tab): void {
    this.activeTab.set(tab);
  }
}
