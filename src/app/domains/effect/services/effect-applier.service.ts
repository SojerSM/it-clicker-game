import { Injectable } from '@angular/core';
import { EffectTarget } from '../types/enum/effect-target.enum';
import { GameStateService } from '../../../core/services/game-state.service';
import { INITIAL_GAME_STATE } from '../../../core/config/state/game-state';

@Injectable({ providedIn: 'root' })
export class EffectApplierService {
  constructor(private gameStateService: GameStateService) {}

  applyModifierToState(target: EffectTarget, modifier: number): void {
    switch (target) {
      case EffectTarget.PLAYER_STRESS_FACTOR:
        this.gameStateService.updatePlayer((player) => {
          const base = INITIAL_GAME_STATE.player.stressFactor;
          player.stressFactor = this.clamp(base * (1 + modifier), 0.5, 1);
        });
        break;
      case EffectTarget.IMPACT_MPI:
        this.gameStateService.updateImpact((impact) => {
          const base = INITIAL_GAME_STATE.impact.mpi;
          impact.mpi = this.clamp(base * (1 + modifier), 0, Infinity);
        });
        break;
      default:
        break;
    }
  }

  resetToBaseState(target: EffectTarget): void {
    switch (target) {
      case EffectTarget.PLAYER_STRESS_FACTOR:
        this.gameStateService.updatePlayer((player) => {
          player.stressFactor = INITIAL_GAME_STATE.player.stressFactor;
        });
        break;
      case EffectTarget.IMPACT_MPI:
        this.gameStateService.updateImpact((impact) => {
          impact.mpi = INITIAL_GAME_STATE.impact.mpi;
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
