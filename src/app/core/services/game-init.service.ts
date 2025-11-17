import { Injectable } from '@angular/core';
import { HeroBuilderService } from '../../domains/heroes/services/hero-builder.service';
import { HeroRole } from '../../domains/heroes/types/enums/hero-role.enum';
import { GameStateService } from './game-state.service';

@Injectable({ providedIn: 'root' })
export class GameInitService {
  constructor(private heroBuilder: HeroBuilderService, private gameState: GameStateService) {}

  init(): void {
    const ceo = this.heroBuilder.build(HeroRole.CEO);

    this.gameState.updateHeroes((state) => {
      state.owned.push(ceo);
    });
  }
}
