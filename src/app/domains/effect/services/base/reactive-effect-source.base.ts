import { effect, Injectable, untracked } from '@angular/core';
import { GameStateService } from '../../../../core/services/game-state.service';
import { EffectService } from '../effect.service';
import { EffectTarget } from '../../types/enum/effect-target.enum';
import { EffectType } from '../../types/enum/effect-type.enum';
import { EffectSource } from '../../types/enum/effect-source.enum';

@Injectable()
export abstract class ReactiveEffectSourceBase {
  protected constructor(
    protected readonly gameStateService: GameStateService,
    protected readonly effectService: EffectService
  ) {
    effect(() => this.observeAndReact());
  }

  /** decides what needs to be observed and what supposed to be an impact */
  protected abstract observeAndReact(): void;

  protected setEffect(id: string, target: EffectTarget, value: number): void {
    this.effectService.addOrUpdateEffect({
      id,
      source: this.getSource(),
      target,
      type: EffectType.ADD,
      value,
      createdAt: Date.now(),
    });
  }

  /** unmount effect with selected id */
  protected removeEffect(id: string): void {
    this.effectService.removeEffect(id);
  }

  /** effect source - each effect might has its own */
  protected abstract getSource(): EffectSource;
}
