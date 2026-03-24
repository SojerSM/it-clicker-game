import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HeroAttributesComponent } from '../../../../../domains/heroes/components/hero-attributes/hero-attributes.component';
import { HeroCardRegularComponent } from '../../../../../domains/heroes/components/hero-cards/card-regular/hero-card-regular.component';
import { HeroEquipmentComponent } from '../../../../../domains/heroes/components/hero-equipment/hero-equipment.component';
import { HeroOverviewComponent } from '../../../../../domains/heroes/components/hero-overview/hero-overview.component';
import { HeroStatsComponent } from '../../../../../domains/heroes/components/hero-stats/hero-stats.component';
import { Tab } from '../../../../../shared/types/tab';
import { HeroListComponent } from './hero-list/hero-list.component';
import { Hero } from '../../../../../domains/heroes/types/hero.model';
import { GameStateService } from '../../../../../core/services/game-state.service';

@Component({
  selector: 'app-hero-actions',
  imports: [HeroCardRegularComponent, CommonModule, TranslatePipe, HeroListComponent],
  templateUrl: './hero-actions.component.html',
  styleUrl: './hero-actions.component.scss',
})
export class HeroActionsComponent {
  @Input() activeTab!: Tab;
  @Input({ required: true }) tabs!: Tab[];
  @Output() tabChange = new EventEmitter<Tab>();

  heroTabs: Tab[] = [
    { id: 1, title: 'game.hero.label.overview', component: HeroOverviewComponent },
    { id: 2, title: 'game.hero.label.equipment', component: HeroEquipmentComponent },
    { id: 3, title: 'game.hero.label.stats', component: HeroStatsComponent },
    { id: 4, title: 'game.hero.label.attributes', component: HeroAttributesComponent },
  ];
  heroActiveTab = signal<Tab>(this.heroTabs[0]);
  selectedHeroId = signal<number>(0);

  constructor(private gameStateService: GameStateService) {}

  get heroes(): Hero[] {
    return this.gameStateService.heroState().owned;
  }

  get selectedHero(): Hero | undefined {
    return this.heroes[this.selectedHeroId()];
  }

  switchTab(tab: Tab): void {
    this.heroActiveTab.set(tab);
  }

  onHeroSelected(heroId: number) {
    this.selectedHeroId.set(heroId);
  }
}
