import { Component, signal, WritableSignal } from '@angular/core';
import { HeroCardComponent } from '../../../../../domains/heroes/components/hero-card/hero-card.component';
import { HeroEquipmentComponent } from '../../../../../domains/heroes/components/hero-equipment/hero-equipment.component';
import { HeroUpgradesComponent } from '../../../../../domains/heroes/components/hero-upgrades/hero-upgrades.component';
import { Tab } from '../../../../../shared/types/tab';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../../../../core/services/game-state.service';
import { Hero } from '../../../../../domains/heroes/types/hero.model';
import { HeroStatsOverviewComponent } from '../../../../../domains/heroes/components/hero-stats-overview/hero-stats-overview.component';

@Component({
  selector: 'app-hero-actions',
  imports: [HeroCardComponent, CommonModule],
  templateUrl: './hero-actions.component.html',
  styleUrl: './hero-actions.component.scss',
})
export class HeroActionsComponent {
  tabs: Tab[] = [
    { id: 1, title: 'Overview', component: HeroStatsOverviewComponent },
    { id: 2, title: 'Equipment', component: HeroEquipmentComponent },
    { id: 3, title: 'Stats', component: HeroStatsOverviewComponent },
    { id: 4, title: 'Upgrades', component: HeroUpgradesComponent },
  ];
  activeTab = signal<Tab>(this.tabs[0]);
  selectedHeroId = signal(0);

  constructor(private gameStateService: GameStateService) {}

  get heroes(): Hero[] {
    return this.gameStateService.heroState().owned;
  }

  get selectedHero(): Hero | undefined {
    return this.heroes[this.selectedHeroId()];
  }

  switchTab(tab: Tab): void {
    this.activeTab.set(tab);
  }
}
