import { Injectable } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import { HeroBuilderService } from '../../heroes/services/hero-builder.service';
import { HeroType } from '../../heroes/types/enums/hero-type.enum';

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

    if (hero.type === HeroType.MINION) {
      this.gameStateService.updateImpact((state) => {
        state.totalPps += hero.organicPps;
      });
    }
  }
}
