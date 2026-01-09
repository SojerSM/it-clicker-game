import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tab } from '../../../../shared/types/tab';
import { LangSelectorComponent } from './lang-selector/lang-selector.component';
import { ActionsPanelService } from '../actions-panel.service';

@Component({
  selector: 'app-vertical-navbar',
  imports: [LangSelectorComponent],
  templateUrl: './vertical-navbar.component.html',
  styleUrl: './vertical-navbar.component.scss',
})
export class VerticalNavbarComponent {
  @Input({ required: true }) tabs!: Tab[];

  constructor(private actionsPanelService: ActionsPanelService) {}

  switchTab(tab: Tab): void {
    this.actionsPanelService.setActiveTab(tab);
  }
}
