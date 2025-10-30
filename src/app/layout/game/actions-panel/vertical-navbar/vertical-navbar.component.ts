import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionsPanelTab } from '../actions-panel.model';

@Component({
  selector: 'app-vertical-navbar',
  imports: [],
  templateUrl: './vertical-navbar.component.html',
  styleUrl: './vertical-navbar.component.scss',
})
export class VerticalNavbarComponent {
  @Input({ required: true }) tabs!: ActionsPanelTab[];
  @Output() activeTab = new EventEmitter<ActionsPanelTab>();

  switchTab(tab: ActionsPanelTab): void {
    this.activeTab.emit(tab);
  }
}
