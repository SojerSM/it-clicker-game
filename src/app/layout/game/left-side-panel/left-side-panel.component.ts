import { Component } from '@angular/core';
import { ResourceSummaryComponent } from '../../../domains/resources/components/header-resources-counter/resource-summary.component';
import { ImpactSummaryComponent } from '../../../domains/impact/components/impact-summary/impact-summary.component';

@Component({
  selector: 'app-left-side-panel',
  imports: [ResourceSummaryComponent, ImpactSummaryComponent],
  templateUrl: './left-side-panel.component.html',
  styleUrl: './left-side-panel.component.scss',
})
export class LeftSidePanelComponent {}
