import { Component } from '@angular/core';
import { GlobalStatsOverviewComponent } from '../../../../../domains/statistics/components/global-stats-overview/global-stats-overview.component';

@Component({
  selector: 'app-statistic-actions',
  imports: [GlobalStatsOverviewComponent],
  templateUrl: './statistic-actions.component.html',
  styleUrl: './statistic-actions.component.scss',
})
export class StatisticActionsComponent {}
