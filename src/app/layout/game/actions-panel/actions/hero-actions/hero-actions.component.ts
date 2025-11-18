import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
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

@Component({
  selector: 'app-hero-actions',
  imports: [HeroCardRegularComponent, CommonModule, HeroCardSimplifiedComponent],
  templateUrl: './hero-actions.component.html',
  styleUrl: './hero-actions.component.scss',
})
export class HeroActionsComponent {
  tabs: Tab[] = [
    { id: 1, title: 'Overview', component: HeroOverviewComponent },
    { id: 2, title: 'Equipment', component: HeroEquipmentComponent },
    { id: 3, title: 'Stats', component: HeroStatsComponent },
    { id: 4, title: 'Attributes', component: HeroAttributesComponent },
  ];
  activeTab = signal<Tab>(this.tabs[0]);
  selectedHeroId = signal(0);

  constructor(private gameStateService: GameStateService, private hireService: HireService) {}

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
    this.activeTab.set(tab);
  }

  hire(): void {
    const heroesAmount = this.gameStateService.heroState().owned.length;

    if (heroesAmount >= 3) return;

    this.hireService.hire();
  }
}
