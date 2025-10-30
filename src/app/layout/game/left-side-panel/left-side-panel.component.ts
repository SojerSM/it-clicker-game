import { Component } from '@angular/core';
import { ResourceSummaryComponent } from '../../../domains/resources/components/header-resources-counter/resource-summary.component';

@Component({
  selector: 'app-left-side-panel',
  imports: [ResourceSummaryComponent],
  templateUrl: './left-side-panel.component.html',
  styleUrl: './left-side-panel.component.scss',
})
export class LeftSidePanelComponent {}
