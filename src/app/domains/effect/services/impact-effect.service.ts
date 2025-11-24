import { Injectable } from '@angular/core';
import { ReactiveEffectSourceBase } from './base/reactive-effect-source.base';
import { GameLoopService } from '../../../core/services/game-loop.service';
import { GameStateService } from '../../../core/services/game-state.service';
import { EffectSource } from '../types/enum/effect-source.enum';
import { EffectTarget } from '../types/enum/effect-target.enum';
import { EffectService } from './effect.service';
import { HeroType } from '../../heroes/types/enums/hero-type.enum';
import { ImpactService } from '../../impact/impact.service';

@Injectable({ providedIn: 'root' })
export class ImpactEffectService extends ReactiveEffectSourceBase {
  private readonly EFFECT_ID = 'impact_effect';
  private readonly MAX_IMPACT_REDUCTION = 0.5;
  private readonly STRESS_START = 0.6;
  private readonly STRESS_END = 1.0;

  constructor(
    override gameLoopService: GameLoopService,
    override gameStateService: GameStateService,
    override effectService: EffectService,
    private impactService: ImpactService
  ) {
    super(gameLoopService, gameStateService, effectService);
  }

  protected override getSource(): EffectSource {
    return EffectSource.HERO_STRESS;
  }

  protected override observeAndReact(): void {
    this.gameStateService.updateHeroes((state) => {
      state.owned.forEach((hero) => {
        const stress = hero.stats.stressFactor ?? hero.stats.baseStress;
        const impactModifier = this.calculateMpiModifierFromStress(stress);

        if (hero.type === HeroType.PLAYER) {
          if (impactModifier > 0) {
            this.setEffect(`${this.EFFECT_ID}_player`, EffectTarget.IMPACT_MPI, impactModifier);
          } else {
            this.removeEffect(`${this.EFFECT_ID}_player`);
          }
        } else if (hero.type === HeroType.MINION) {
          hero.totalPps = hero.organicPps * (1 - impactModifier);
        }

        this.impactService.recalculate();
      });
    });
  }

  private calculateMpiModifierFromStress(stressFactor: number): number {
    if (stressFactor <= this.STRESS_START) return 0;

    const normalized = (stressFactor - this.STRESS_START) / (this.STRESS_END - this.STRESS_START);
    return normalized * this.MAX_IMPACT_REDUCTION;
  }
}
