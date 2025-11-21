import { Injectable } from '@angular/core';
import { GameLoopService } from '../../../core/services/game-loop.service';
import { GameStateService } from '../../../core/services/game-state.service';
import { Hero } from '../../heroes/types/hero.model';
import { EffectSource } from '../types/enum/effect-source.enum';
import { EffectTarget } from '../types/enum/effect-target.enum';
import { ReactiveEffectSourceBase } from './base/reactive-effect-source.base';
import { EffectService } from './effect.service';

type Stressors = Record<string, { value: number; weight: number }>;

@Injectable({ providedIn: 'root' })
export class StressEffectService extends ReactiveEffectSourceBase {
  private readonly EFFECT_ID = 'global_stress_effect';
  private readonly MAX_STRESS = 1;
  private readonly RELAX_RATE = 0.01;
  private readonly GROWTH_SCALE = 0.0002;
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
    const stressors: Stressors = this.collectStressors();

    this.gameStateService.updateHeroes((state) => {
      state.owned = state.owned.map((hero) => {
        const baseStress = hero.stressFactor;
        const newStress = this.calculateNewStress(stressors, baseStress, hero);
        const modifier = newStress / baseStress - 1;

        if (this.active) {
          this.setEffect(`${this.EFFECT_ID}_${hero.id}`, EffectTarget.HEROES, modifier);
        } else {
          this.removeEffect(`${this.EFFECT_ID}_${hero.id}`);
        }

        return {
          ...hero,
          stressFactor: newStress,
        };
      });
    });
  }

  private calculateNewStress(stressors: Stressors, baseStress: number, hero: Hero): number {
    const currentStress = hero.stressFactor ?? baseStress;
    const weightedSum = Object.values(stressors).reduce((sum, s) => sum + s.value * s.weight, 0);

    let growthRate = this.GROWTH_SCALE * Math.pow(weightedSum, 2);
    growthRate = Math.min(growthRate, this.MAX_GROWTH);

    const relaxFactor = 1 - Math.min(weightedSum / 10, 1);

    let newStress = currentStress;

    if (weightedSum > 0) {
      newStress = Math.min(currentStress + growthRate * (1 - currentStress), this.MAX_STRESS);
      this.active = true;
    } else {
      newStress = Math.max(currentStress - this.RELAX_RATE * relaxFactor, baseStress);
      if (newStress <= baseStress) this.active = false;
    }

    return newStress;
  }

  private collectStressors(): Stressors {
    const ticketsCount = this.gameStateService.ticketState().active.length;

    const stressors: Stressors = {};

    if (ticketsCount > 10) {
      stressors['tickets'] = {
        value: ticketsCount - 10,
        weight: 0.6,
      };
    }

    return stressors;
  }
}
