import { Injectable } from '@angular/core';
import { ReactiveEffectSourceBase } from './base/reactive-effect-source.base';
import { EffectSource } from '../types/enum/effect-source.enum';
import { INITIAL_GAME_STATE } from '../../../core/config/state/game-state';
import { GameLoopService } from '../../../core/services/game-loop.service';
import { GameStateService } from '../../../core/services/game-state.service';
import { EffectService } from './effect.service';
import { EffectTarget } from '../types/enum/effect-target.enum';

@Injectable({ providedIn: 'root' })
export class StressEffect extends ReactiveEffectSourceBase {
  private readonly EFFECT_ID = 'global_stress_effect';
  private readonly BASE_STRESS = INITIAL_GAME_STATE.player.stressFactor;
  private readonly MAX_STRESS = 1;
  private readonly RELAX_RATE = 0.01;
  private readonly GROWTH_SCALE = 0.00002;
  private readonly MAX_GROWTH = 0.05;
  private active = false;

  constructor(
    override gameLoopService: GameLoopService,
    override gameStateService: GameStateService,
    override effectService: EffectService
  ) {
    super(gameLoopService, gameStateService, effectService);
  }

  protected override getSource(): EffectSource {
    return EffectSource.STRESSORS;
  }

  protected override observeAndReact(): void {
    const currentStress = this.gameStateService.playerState().stressFactor;
    const stressors = this.collectStressors();
    const weightedSum = Object.values(stressors).reduce((sum, s) => sum + s.value * s.weight, 0);

    let growthRate = this.GROWTH_SCALE * Math.pow(weightedSum, 2);
    growthRate = Math.min(growthRate, this.MAX_GROWTH);

    const relaxFactor = 1 - Math.min(weightedSum / 10, 1);

    let newStress = currentStress;

    if (weightedSum > 0) {
      newStress = Math.min(currentStress + growthRate * (1 - currentStress), this.MAX_STRESS);
      this.active = true;
    } else {
      newStress = Math.max(currentStress - this.RELAX_RATE * relaxFactor, this.BASE_STRESS);
      if (newStress <= this.BASE_STRESS) this.active = false;
    }

    const modifier = newStress / this.BASE_STRESS - 1;

    if (this.active) {
      this.setEffect(this.EFFECT_ID, EffectTarget.PLAYER_STRESS_FACTOR, modifier);
    } else {
      this.removeEffect(this.EFFECT_ID);
    }
  }

  private collectStressors(): Record<string, { value: number; weight: number }> {
    const ticketsCount = this.gameStateService.ticketState().active.length;

    const stressors: Record<string, { value: number; weight: number }> = {};

    if (ticketsCount > 10) {
      stressors['tickets'] = {
        value: ticketsCount - 10,
        weight: 0.6,
      };
    }

    return stressors;
  }
}
