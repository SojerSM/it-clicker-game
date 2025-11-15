import { Injectable, signal } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import { BALANCE } from '../../../core/config/state/balance';
import { Hero } from '../types/hero.model';
import { HeroType } from '../types/enums/hero-type.enum';

@Injectable({ providedIn: 'root' })
export class HeroService {
  constructor(private gameStateService: GameStateService) {}

  increaseExp(heroId?: string): void {
    if (heroId) {
      this.gameStateService.updateHeroes((state) => {
        const hero = state.owned.find((h) => h.id === heroId);
        if (!hero) return;

        hero.exp += hero.expRatio * this.gameStateService.impactState().organicMpi;
        this.levelUpIfAchieved(hero);
      });
    } else {
      this.gameStateService.updateHeroes((state) => {
        state.owned.forEach((hero) => {
          if (hero.type === HeroType.MINION) {
            hero.exp += hero.expRatio * hero.organicPps;
            this.levelUpIfAchieved(hero);
          }
        });
      });
    }
  }

  private levelUpIfAchieved(hero: Hero): void {
    if (!hero) return;

    if (hero.exp >= hero.expToLevelUp) {
      const expSurplus = hero.exp - hero.expToLevelUp;

      hero.lvl += 1;
      hero.exp = expSurplus;
      hero.expToLevelUp = this.calcNextRequiredExp(hero.lvl, hero);
    }
  }

  private calcNextRequiredExp(lvl: number, hero: Hero): number {
    const baseExp = hero.baseRequiredExp;

    const newRequiredExp =
      baseExp *
      (Math.pow(lvl - 1, BALANCE.HERO_REQUIRED_EXP_MULTIPLIER) * 0.5 + Math.exp(lvl / 20));

    return Math.round(newRequiredExp);
  }
}
