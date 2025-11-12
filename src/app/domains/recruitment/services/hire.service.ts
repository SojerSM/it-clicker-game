import { Injectable } from '@angular/core';
import { HeroBuilderService } from '../../heroes/services/hero-builder.service';
import { GameStateService } from '../../../core/services/game-state.service';

@Injectable({ providedIn: 'root' })
export class HireService {
  constructor(
    private heroBuilder: HeroBuilderService,
    private gameStateService: GameStateService
  ) {}

  hire(): void {
    const hero = this.heroBuilder.build();

    this.gameStateService.updateHeroes((state) => {
      state.owned.push(hero);
    });

    this.gameStateService.updateImpact((state) => {
      state.pps += hero.pps;
    });
  }
}
