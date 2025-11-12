import { Injectable, signal } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import { BALANCE } from '../../../core/config/state/balance';
import { Hero } from '../types/hero.model';

@Injectable({ providedIn: 'root' })
export class HeroService {
  constructor(private gameStateService: GameStateService) {}

  increaseExp(value: number, heroId: string): void {
    this.gameStateService.updateHeroes((state) => {
      const hero = state.owned.find((h) => h.id === heroId);
      if (!hero) return;

      hero.exp += value;

      if (hero.exp >= hero.expToLevelUp) {
        this.levelUp(hero);
      }
    });
  }

  private levelUp(hero: Hero): void {
    if (!hero) return;

    hero.lvl += 1;
    hero.exp = 0;
    hero.expToLevelUp = this.calcNextRequiredExp(hero.lvl, hero);
  }

  private calcNextRequiredExp(lvl: number, hero: Hero): number {
    const baseExp = hero.expToLevelUp;

    const newRequiredExp =
      baseExp *
      (Math.pow(lvl - 1, BALANCE.HERO_REQUIRED_EXP_MULTIPLIER) * 0.5 + Math.exp(lvl / 20));

    return Math.round(newRequiredExp);
  }
}
