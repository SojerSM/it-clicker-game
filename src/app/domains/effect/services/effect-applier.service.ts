import { Injectable } from '@angular/core';
import { EffectTarget } from '../types/enum/effect-target.enum';
import { GameStateService } from '../../../core/services/game-state.service';
import { INITIAL_GAME_STATE } from '../../../core/config/state/game-state';

@Injectable({ providedIn: 'root' })
export class EffectApplierService {
  constructor(private gameStateService: GameStateService) {}

  applyModifierToState(target: EffectTarget, modifier: number): void {
    switch (target) {
      case EffectTarget.HEROES:
        // do nothing - stress is evalueted by stress-effect.service.ts
        break;
      case EffectTarget.IMPACT_MPI:
        this.gameStateService.updateImpact((impact) => {
          const base = impact.organicMpi;
          impact.totalMpi = this.clamp(base * (1 + modifier), 0, Infinity);
        });
        break;
      default:
        break;
    }
  }

  resetToBaseState(target: EffectTarget): void {
    switch (target) {
      case EffectTarget.HEROES:
        this.gameStateService.updateHeroes((state) => {
          state.owned.forEach((hero) => {
            hero.stressFactor = hero.baseStress;
          });
        });
        break;
      case EffectTarget.IMPACT_MPI:
        this.gameStateService.updateImpact((impact) => {
          impact.totalMpi = impact.organicMpi;
        });
        break;
      default:
        break;
    }
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }
}
