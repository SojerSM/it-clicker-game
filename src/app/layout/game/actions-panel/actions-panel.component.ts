import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectProgressComponent } from '../../../domains/progress/projects/components/progress-header/project-progress.component';
import { VerticalNavbarComponent } from './vertical-navbar/vertical-navbar.component';
import { ActionsPanelService } from './actions-panel.service';
import { Tab } from '../../../shared/types/tab';

@Component({
  selector: 'app-actions-panel',
  imports: [VerticalNavbarComponent, CommonModule, ProjectProgressComponent],
  templateUrl: './actions-panel.component.html',
  styleUrl: './actions-panel.component.scss',
})
export class ActionsPanelComponent {
  constructor(private actionsPanelService: ActionsPanelService) {}

  get tabs(): Tab[] {
    return this.actionsPanelService.getTabs();
  }

  get activeTab(): Tab {
    return this.actionsPanelService.getActiveTab();
  }
}
