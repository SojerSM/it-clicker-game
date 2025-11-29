import { Injectable } from '@angular/core';
import { BALANCE } from '../../../core/config/state/balance';
import { GameStateService } from '../../../core/services/game-state.service';
import { HeroType } from '../types/enums/hero-type.enum';
import { Hero } from '../types/hero.model';

@Injectable({ providedIn: 'root' })
export class HeroService {
  constructor(private gameStateService: GameStateService) {}

  increaseExp(heroId?: string): void {
    if (heroId) {
      this.gameStateService.updateHeroes((state) => {
        const hero = state.owned.find((h) => h.id === heroId);
        if (!hero) return;

        hero.growth.exp += this.calculateExpReward(hero);
        this.levelUpIfAchieved(hero);
      });
    } else {
      this.gameStateService.updateHeroes((state) => {
        state.owned.forEach((hero) => {
          if (hero.type === HeroType.MINION) {
            hero.growth.exp += this.calculateExpReward(hero);
            this.levelUpIfAchieved(hero);
          }
        });
      });
    }
  }

  private levelUpIfAchieved(hero: Hero): void {
    if (!hero) return;

    if (hero.growth.exp >= hero.growth.expToLevelUp) {
      const expSurplus = hero.growth.exp - hero.growth.expToLevelUp;

      hero.growth.lvl += 1;
      hero.growth.exp = expSurplus;
      hero.growth.expToLevelUp = this.calcNextRequiredExp(hero.growth.lvl, hero);
    }
  }

  private calcNextRequiredExp(lvl: number, hero: Hero): number {
    const baseExp = hero.growth.baseRequiredExp;

    const newRequiredExp =
      baseExp *
      (Math.pow(lvl - 1, BALANCE.HERO_REQUIRED_EXP_MULTIPLIER) * 0.5 + Math.exp(lvl / 20));

    return Math.round(newRequiredExp);
  }

  /**
   * Calculate how many exp points should a hero gain by click (if PLAYER) or per tick (if MINION)
   */
  private calculateExpReward(hero: Hero): number {
    return hero.growth.expRatio * hero.stats.learningRate;
  }
}
