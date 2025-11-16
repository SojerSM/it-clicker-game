import { Injectable, signal } from '@angular/core';
import { HeroService } from '../../domains/heroes/services/hero.service';
import { ImpactService } from '../../domains/impact/impact.service';
import { BALANCE } from '../config/state/balance';

@Injectable({ providedIn: 'root' })
export class GameLoopService {
  private readonly interval = BALANCE.GAME_LOOP_INTERVAL;
  readonly tick = signal(0);

  constructor(private impactService: ImpactService, private heroService: HeroService) {
    this.start();
  }

  private start(): void {
    setInterval(() => {
      this.tick.update((value) => value + 1);

      this.handlePassiveMechanics();
    }, this.interval);
  }

  /**
   * Passive mechanics that has to be invoked each tick
   */
  private handlePassiveMechanics(): void {
    this.impactService.applyPpsDamage();
    this.heroService.increaseExp();
  }
}
