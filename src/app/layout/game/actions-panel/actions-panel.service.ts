import { Injectable, signal } from '@angular/core';
import { Tab } from '../../../shared/types/tab';
import { CompanyActionsComponent } from './actions/company-actions/company-actions.component';
import { HeroActionsComponent } from './actions/hero-actions/hero-actions.component';
import { RecruitmentActionsComponent } from './actions/recruitment-actions/recruitment-actions.component';
import { StatisticActionsComponent } from './actions/statistic-actions/statistic-actions.component';

@Injectable({ providedIn: 'root' })
export class ActionsPanelService {
  private tabs: Tab[] = [
    { id: 1, title: 'Team', component: HeroActionsComponent },
    { id: 2, title: 'Hire', component: RecruitmentActionsComponent },
    { id: 3, title: 'Comp', component: CompanyActionsComponent },
    { id: 4, title: 'Stats', component: StatisticActionsComponent },
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
