import { Injectable } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import { HeroType } from '../../heroes/types/enums/hero-type.enum';
import { HeroRole } from '../../heroes/types/enums/hero-role.enum';
import { HeroGeneratorService } from '../../heroes/services/hero-generator.service';

@Injectable({ providedIn: 'root' })
export class HireService {
  constructor(
    private gameStateService: GameStateService,
    private heroGeneratorService: HeroGeneratorService
  ) {}

  hire(): void {
    const hero = this.heroGeneratorService.generate(HeroRole.PROGRAMMER);

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
