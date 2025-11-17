import { effect, Injectable } from '@angular/core';
import { BALANCE } from '../../../core/config/state/balance';
import { GameLoopService } from '../../../core/services/game-loop.service';
import { GameStateService } from '../../../core/services/game-state.service';
import { Effect } from '../types/effect.model';
import { EffectTarget } from '../types/enum/effect-target.enum';
import { EffectType } from '../types/enum/effect-type.enum';
import { EffectApplierService } from './effect-applier.service';

@Injectable({ providedIn: 'root' })
export class EffectService {
  constructor(
    private gameStateService: GameStateService,
    private gameLoopService: GameLoopService,
    private effectApplierService: EffectApplierService
  ) {
    effect(() => {
      this.gameLoopService.tick();
      this.update();
    });
  }

  addEffect(effect: Effect): void {
    this.gameStateService.updateEffects((state) => {
      state.active.push(effect);
    });
  }

  addOrUpdateEffect(effect: Effect): void {
    this.gameStateService.updateEffects((state) => {
      const index = state.active.findIndex((e) => e.id === effect.id);
      if (index >= 0) {
        state.active[index] = effect;
      } else {
        state.active.push(effect);
      }
    });
    this.update();
  }

  removeEffect(effectId: string): void {
    this.gameStateService.updateEffects((state) => {
      state.active = state.active.filter((e) => e.id !== effectId);
    });

    this.update();
  }

  private update(): void {
    const effects = this.gameStateService.effectState().active;
    this.recalculateTargets(effects);
  }

  private recalculateTargets(effects: Effect[]): void {
    const grouped = this.groupByTarget(effects);
    const allTargets = Object.values(EffectTarget);

    for (const [targetKey, effectGroup] of Object.entries(grouped)) {
      const target = targetKey as EffectTarget;
      const totalModifier = this.calculateModifier(effectGroup);
      this.effectApplierService.applyModifierToState(target, totalModifier);
    }

    for (const target of allTargets) {
      if (!grouped[target]) {
        this.effectApplierService.resetToBaseState(target);
      }
    }
  }

  private groupByTarget(effects: Effect[]): Record<string, Effect[]> {
    return effects.reduce((acc, effect) => {
      if (!acc[effect.target]) {
        acc[effect.target] = [];
      }
      acc[effect.target].push(effect);
      return acc;
    }, {} as Record<string, Effect[]>);
  }

  /** Calculate modifiers based on existing effects
   *
   * Additive effects are accumulative, 1st + 2nd + 3rd
   * Multiplicative effects works like cascade
   */
  private calculateModifier(effects: Effect[]): number {
    let additive = BALANCE.EFFECTS_INITIAL_ADD_VALUE;
    let multiplicative = BALANCE.EFFECTS_INITIAL_MULTIPLY_VALUE;
    let override: number | null = null;

    for (const effect of effects) {
      switch (effect.type) {
        case EffectType.ADD:
          additive += effect.value;
          break;
        case EffectType.MULTIPLY:
          multiplicative *= BALANCE.EFFECTS_INITIAL_MULTIPLY_VALUE + effect.value;
          break;
        case EffectType.OVERRIDE:
          override = effect.value;
          break;
      }
    }
    if (override !== null) return override;
    return multiplicative + additive - BALANCE.EFFECTS_INITIAL_MULTIPLY_VALUE;
  }
}
