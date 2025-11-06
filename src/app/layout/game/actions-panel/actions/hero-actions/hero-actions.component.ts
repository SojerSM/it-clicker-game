import { Component, signal } from '@angular/core';
import { PlayerInfoComponent } from '../../../../../domains/player/components/player-info/player-info.component';
import { PlayerStatsOverviewComponent } from '../../../../../domains/player/components/player-stats-overview/player-stats-overview.component';
import { Tab } from '../../../../../shared/types/tab';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-actions',
  imports: [PlayerInfoComponent, CommonModule],
  templateUrl: './hero-actions.component.html',
  styleUrl: './hero-actions.component.scss',
})
export class HeroActionsComponent {
  tabs: Tab[] = [
    { id: 1, title: 'Overview', component: PlayerStatsOverviewComponent },
    { id: 1, title: 'Equipment', component: PlayerStatsOverviewComponent },
    { id: 1, title: 'Stats', component: PlayerStatsOverviewComponent },
    { id: 1, title: 'Upgrades', component: PlayerStatsOverviewComponent },
  ];

  activeTab = signal<Tab>(this.tabs[0]);

  switchTab(tab: Tab): void {
    this.activeTab.set(tab);
  }
}
