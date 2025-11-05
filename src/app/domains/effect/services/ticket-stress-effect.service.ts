import { Injectable } from '@angular/core';
import { ReactiveEffectSourceBase } from './base/reactive-effect-source.base';
import { EffectSource } from '../types/enum/effect-source.enum';
import { EffectTarget } from '../types/enum/effect-target.enum';

@Injectable({ providedIn: 'root' })
export class TicketStressEffectService extends ReactiveEffectSourceBase {
  private readonly EFFECT_ID = 'tickets_stress_effect';
  private readonly STEP = 0.01;
  private currentValue = 0;

  protected override observeAndReact(): void {
    const ticketsCount = this.gameStateService.ticketState().active.length;
    this.updateStressEffect(ticketsCount);
  }

  protected override getSource(): EffectSource {
    return EffectSource.TICKETS;
  }

  private updateStressEffect(ticketsCount: number): void {
    const targetValue = this.computeStressModifier(ticketsCount);

    if (ticketsCount > 10 && this.currentValue < targetValue) {
      this.currentValue = Math.min(targetValue, this.currentValue + this.STEP);
    } else if (ticketsCount < 10 && this.currentValue > 0) {
      this.currentValue = Math.max(0, this.currentValue - this.STEP);
    }

    if (this.currentValue > 0) {
      this.setEffect(this.EFFECT_ID, EffectTarget.PLAYER_STRESS_FACTOR, this.currentValue);
    } else if (this.currentValue === 0 && ticketsCount < 10) {
      this.removeEffect(this.EFFECT_ID);
    }
  }

  private computeStressModifier(tickets: number): number {
    if (tickets <= 10) return 0;

    const overload = tickets - 10;
    const normalized = overload / 40;
    return Math.min(1, Math.pow(normalized, 1.5));
  }
}
