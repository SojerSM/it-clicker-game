import { Injectable } from '@angular/core';
import { GameStateService } from '../../core/services/game-state.service';
import { StatisticService } from '../statistics/services/statistic.service';

@Injectable({ providedIn: 'root' })
export class ResourcesService {
  constructor(
    private gameStateService: GameStateService,
    private statisticService: StatisticService
  ) {}

  increaseMoney(value: number) {
    this.gameStateService.updateResource((state) => {
      state.money = state.money + value;
    });
    this.statisticService.increaseMoneyEarned(value);
  }

  decreaseMoney(value: number) {
    this.gameStateService.updateResource((state) => {
      const result = state.money - value;
      state.money = result >= 0 ? result : 0;
    });
    this.statisticService.increaseMoneySpent(value);
  }
}
