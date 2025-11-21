import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tab } from '../../../../shared/types/tab';
import { LangSelectorComponent } from './lang-selector/lang-selector.component';

@Component({
  selector: 'app-vertical-navbar',
  imports: [LangSelectorComponent],
  templateUrl: './vertical-navbar.component.html',
  styleUrl: './vertical-navbar.component.scss',
})
export class VerticalNavbarComponent {
  @Input({ required: true }) tabs!: Tab[];
  @Output() activeTab = new EventEmitter<Tab>();

  switchTab(tab: Tab): void {
    this.activeTab.emit(tab);
  }
}
