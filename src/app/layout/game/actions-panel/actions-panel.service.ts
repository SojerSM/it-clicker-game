import { Injectable, signal } from '@angular/core';
import { Tab } from '../../../shared/types/tab';
import { HeroActionsComponent } from './actions/hero-actions/hero-actions.component';
import { RecruitmentActionsComponent } from './actions/recruitment-actions/recruitment-actions.component';
import { GlobalStatsOverviewComponent } from '../../../domains/statistics/components/global-stats-overview/global-stats-overview.component';
import { StatisticActionsComponent } from './actions/statistic-actions/statistic-actions.component';

@Injectable({ providedIn: 'root' })
export class ActionsPanelService {
  private tabs: Tab[] = [
    { id: 1, title: 'Team', component: HeroActionsComponent },
    { id: 2, title: 'Hire', component: RecruitmentActionsComponent },
    { id: 3, title: 'Stats', component: StatisticActionsComponent },
  ];

  readonly activeTab = signal<Tab>(this.tabs[0]);

  setActiveTab(tab: Tab) {
    this.activeTab.set(tab);
  }

  getActiveTab(): Tab {
    return this.activeTab();
  }

  getTabs(): Tab[] {
    return this.tabs;
  }
}
