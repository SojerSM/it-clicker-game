import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { GameStateService } from '../../../../../core/services/game-state.service';
import { HeroCardRegularComponent } from '../../../../../domains/heroes/components/hero-cards/card-regular/hero-card-regular.component';
import { HeroCardSimplifiedComponent } from '../../../../../domains/heroes/components/hero-cards/card-simplified/hero-card-simplified.component';
import { HeroEquipmentComponent } from '../../../../../domains/heroes/components/hero-equipment/hero-equipment.component';
import { HeroStatsComponent } from '../../../../../domains/heroes/components/hero-stats/hero-stats.component';
import { Hero } from '../../../../../domains/heroes/types/hero.model';
import { HireService } from '../../../../../domains/recruitment/services/hire.service';
import { HeroAttributesComponent } from '../../../../../domains/heroes/components/hero-attributes/hero-attributes.component';
import { Tab } from '../../../../../shared/types/tab';
import { HeroOverviewComponent } from '../../../../../domains/heroes/components/hero-overview/hero-overview.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ActionsPanelService } from '../../actions-panel.service';

@Component({
  selector: 'app-hero-actions',
  imports: [HeroCardRegularComponent, CommonModule, HeroCardSimplifiedComponent, TranslatePipe],
  templateUrl: './hero-actions.component.html',
  styleUrl: './hero-actions.component.scss',
})
export class HeroActionsComponent {
  @Input() activeTab!: Tab;
  @Input({ required: true }) tabs!: Tab[];
  @Output() tabChange = new EventEmitter<Tab>();

  heroTabs: Tab[] = [
    { id: 1, title: 'hero.label.overview', component: HeroOverviewComponent },
    { id: 2, title: 'hero.label.equipment', component: HeroEquipmentComponent },
    { id: 3, title: 'hero.label.stats', component: HeroStatsComponent },
    { id: 4, title: 'hero.label.attributes', component: HeroAttributesComponent },
  ];
  heroActiveTab = signal<Tab>(this.heroTabs[0]);
  selectedHeroId = signal(0);

  constructor(
    private gameStateService: GameStateService,
    private actionsPanelService: ActionsPanelService
  ) {}

  get heroes(): Hero[] {
    return this.gameStateService.heroState().owned;
  }

  get selectedHero(): Hero | undefined {
    return this.heroes[this.selectedHeroId()];
  }

  selectHero(id: string): void {
    const heroId = this.heroes.findIndex((hero) => hero.id === id);
    this.selectedHeroId.set(heroId);
  }

  switchTab(tab: Tab): void {
    this.heroActiveTab.set(tab);
  }

  hire(): void {
    const tab = this.actionsPanelService.getTabs()[1];
    this.actionsPanelService.setActiveTab(tab);
  }
}
