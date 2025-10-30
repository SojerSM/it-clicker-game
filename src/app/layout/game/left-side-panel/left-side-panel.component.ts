import { Component } from '@angular/core';
import { HeaderResourcesCounterComponent } from '../../../domains/resources/components/header-resources-counter/header-resources-counter.component';

@Component({
  selector: 'app-left-side-panel',
  imports: [HeaderResourcesCounterComponent],
  templateUrl: './left-side-panel.component.html',
  styleUrl: './left-side-panel.component.scss',
})
export class LeftSidePanelComponent {}
