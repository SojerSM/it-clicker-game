import { effect, Injectable, untracked } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import { Effect } from '../types/effect.model';
import { EffectTarget } from '../types/enum/effect-target.enum';
import { EffectType } from '../types/enum/effect-type.enum';

@Injectable({ providedIn: 'root' })
export class EffectService {
  constructor(private gameStateService: GameStateService) {
    effect(() => {
      const effects = this.gameStateService.effectState().active;
      untracked(() => this.recalculateTargets(effects));
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
      if (index >= 0) state.active[index] = effect;
      else state.active.push(effect);
    });
  }

  removeEffect(effectId: string): void {
    this.gameStateService.updateEffects((state) => {
      state.active = state.active.filter((e) => e.id !== effectId);
    });
  }

  /** Przelicza wpływ efektów na poszczególne targety */
  private recalculateTargets(effects: Effect[]): void {
    const grouped = this.groupByTarget(effects);

    for (const [targetKey, effectGroup] of Object.entries(grouped)) {
      const target = targetKey as EffectTarget;
      const totalModifier = this.calculateModifier(effectGroup);
      this.applyModifierToState(target, totalModifier);
    }
  }

  /** Grupuje efekty po targetach */
  private groupByTarget(effects: Effect[]): Record<string, Effect[]> {
    return effects.reduce((acc, effect) => {
      if (!acc[effect.target]) acc[effect.target] = [];
      acc[effect.target].push(effect);
      return acc;
    }, {} as Record<string, Effect[]>);
  }

  /** Sumuje efekty na danym targetcie */
  private calculateModifier(effects: Effect[]): number {
    let additive = 0;
    let multiplicative = 1;
    let override: number | null = null;

    for (const e of effects) {
      switch (e.type) {
        case EffectType.ADD:
          additive += e.value;
          break;
        case EffectType.MULTIPLY:
          multiplicative *= 1 + e.value;
          break;
        case EffectType.OVERRIDE:
          override = e.value;
          break;
      }
    }

    if (override !== null) return override;
    return multiplicative + additive - 1; // wynikowy modyfikator
  }

  /** Aktualizuje odpowiednią część stanu w GameStateService */
  private applyModifierToState(target: EffectTarget, modifier: number): void {
    switch (target) {
      case EffectTarget.PLAYER_STRESS_FACTOR:
        this.gameStateService.updatePlayer((player) => {
          const base = 0.5;
          player.stressFactor = this.clamp(base * (1 + modifier), 0.5, 1);
        });
        break;

      case EffectTarget.IMPACT_MPI:
        this.gameStateService.updateImpact((impact) => {
          const base = 1;
          impact.mpi = this.clamp(base * (1 + modifier), 0, Infinity);
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
