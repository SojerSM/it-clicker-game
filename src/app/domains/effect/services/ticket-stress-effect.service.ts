import { Injectable } from '@angular/core';
import { ReactiveEffectSourceBase } from './base/reactive-effect-source.base';
import { EffectSource } from '../types/enum/effect-source.enum';
import { EffectTarget } from '../types/enum/effect-target.enum';
import { INITIAL_GAME_STATE } from '../../../core/config/state/game-state';
import { GameLoopService } from '../../../core/services/game-loop.service';
import { GameStateService } from '../../../core/services/game-state.service';
import { EffectService } from './effect.service';

@Injectable({ providedIn: 'root' })
export class TicketStressEffectService extends ReactiveEffectSourceBase {
  private readonly EFFECT_ID = 'tickets_stress_effect';
  private readonly BASE_STRESS = INITIAL_GAME_STATE.player.stressFactor;
  private readonly STRESS_STEP = 0.01;
  private readonly MAX_STRESS = 1;
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
    const ticketsCount = this.gameStateService.ticketState().active.length;
    const currentStress = this.gameStateService.playerState().stressFactor;
    const breakpoint = 10;

    if (ticketsCount > breakpoint) {
      const overLimit = ticketsCount - breakpoint;
      const growthRate = Math.min(0.05, 0.00003125 * Math.pow(overLimit, 2));

      const newStress = Math.min(currentStress + growthRate, this.MAX_STRESS);
      const modifier = newStress / this.BASE_STRESS - 1;

      this.setEffect(this.EFFECT_ID, EffectTarget.PLAYER_STRESS_FACTOR, modifier);
      this.gameStateService.updatePlayer((state) => {
        state.stressFactor = newStress;
      });
      this.active = true;
      console.log(this.active);
    }

    if (ticketsCount < 10) {
      const newStress = Math.max(currentStress - this.STRESS_STEP, this.BASE_STRESS);
      const modifier = newStress / this.BASE_STRESS - 1;

      if (newStress <= this.BASE_STRESS) {
        this.removeEffect(this.EFFECT_ID);
        this.active = false;
        console.log(this.active);
      } else {
        this.setEffect(this.EFFECT_ID, EffectTarget.PLAYER_STRESS_FACTOR, modifier);
        console.log(this.active);
      }
    }
  }
}
