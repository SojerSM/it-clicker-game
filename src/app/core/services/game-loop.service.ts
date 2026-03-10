import { Injectable, signal } from '@angular/core';
import { HeroService } from '../../domains/heroes/services/hero.service';
import { ImpactService } from '../../domains/impact/impact.service';
import { BALANCE } from '../config/state/balance';
import { StatisticService } from '../../domains/statistics/services/statistic.service';

@Injectable({ providedIn: 'root' })
export class GameLoopService {
  private readonly interval = BALANCE.GAME_LOOP_INTERVAL;
  private intervalId?: number;

  readonly tick = signal(0);

  constructor(
    private impactService: ImpactService,
    private heroService: HeroService,
    private statisticService: StatisticService
  ) {}

  start(): void {
    this.intervalId = window.setInterval(() => {
      this.tick.update((value) => value + 1);

      this.statisticService.increaseTotalPlaytime();
      this.handlePassiveMechanics();
    }, this.interval);
  }

  stop(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
    }
  }

  /**
   * Passive mechanics that has to be invoked each tick
   */
  private handlePassiveMechanics(): void {
    this.impactService.applyPpsDamage();
    this.heroService.increaseExp();
  }
}
