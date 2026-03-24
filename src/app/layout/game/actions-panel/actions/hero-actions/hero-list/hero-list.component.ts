import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ActionsPanelService } from '../../../actions-panel.service';
import { GameStateService } from '../../../../../../core/services/game-state.service';
import { HeroCardSimplifiedComponent } from '../../../../../../domains/heroes/components/hero-cards/card-simplified/hero-card-simplified.component';
import { Hero } from '../../../../../../domains/heroes/types/hero.model';

@Component({
  selector: 'app-hero-list',
  imports: [HeroCardSimplifiedComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent {
  @Output() selectedHeroId = new EventEmitter<number>();

  constructor(
    private actionsPanelService: ActionsPanelService,
    private gameStateService: GameStateService
  ) {}

  get heroes(): Hero[] {
    return this.gameStateService.heroState().owned;
  }

  get slots(): number[] {
    return Array(this.gameStateService.heroState().slots);
  }

  hire(): void {
    const tab = this.actionsPanelService.getTabs()[1];
    this.actionsPanelService.setActiveTab(tab);
  }

  selectHero(id: string): void {
    const heroId = this.heroes.findIndex((hero) => hero.id === id);
    this.selectedHeroId.emit(heroId);
  }
}
