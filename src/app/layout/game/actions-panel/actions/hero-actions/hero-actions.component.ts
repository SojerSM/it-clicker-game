import { Component, signal } from '@angular/core';
import { HeroEquipmentComponent } from '../../../../../domains/heroes/components/hero-equipment/hero-equipment.component';
import { Tab } from '../../../../../shared/types/tab';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../../../../core/services/game-state.service';
import { Hero } from '../../../../../domains/heroes/types/hero.model';
import { HeroStatsComponent } from '../../../../../domains/heroes/components/hero-stats/hero-stats.component';
import { HireService } from '../../../../../domains/recruitment/services/hire.service';
import { HeroCardRegularComponent } from '../../../../../domains/heroes/components/hero-cards/card-regular/hero-card-regular.component';
import { HeroCardSimplifiedComponent } from '../../../../../domains/heroes/components/hero-cards/card-simplified/hero-card-simplified.component';
import { AttributesGridComponent } from '../../../../../domains/upgrades/attributes/components/attributes-grid/attributes-grid.component';

@Component({
  selector: 'app-hero-actions',
  imports: [HeroCardRegularComponent, CommonModule, HeroCardSimplifiedComponent],
  templateUrl: './hero-actions.component.html',
  styleUrl: './hero-actions.component.scss',
})
export class HeroActionsComponent {
  tabs: Tab[] = [
    { id: 1, title: 'Overview', component: HeroStatsComponent },
    { id: 2, title: 'Equipment', component: HeroEquipmentComponent },
    { id: 3, title: 'Stats', component: HeroStatsComponent },
    { id: 4, title: 'Attributes', component: AttributesGridComponent },
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
