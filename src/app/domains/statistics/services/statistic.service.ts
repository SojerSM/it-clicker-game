import { Injectable } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import { BALANCE } from '../../../core/config/state/balance';

@Injectable({ providedIn: 'root' })
export class StatisticService {
  constructor(private gameStateService: GameStateService) {}

  increaseRecruitedHeroes(value: number = 1): void {
    this.gameStateService.updateStatistics((state) => {
      state.heroes.recruited += value;
    });
  }

  increaseClicks(value: number = 1): void {
    this.gameStateService.updateStatistics((state) => {
      state.impact.clicks += value;
    });
  }

  increaseMoneyEarned(value: number = 1): void {
    this.gameStateService.updateStatistics((state) => {
      state.money.earned += value;
    });
  }

  increaseMoneySpent(value: number = 1): void {
    this.gameStateService.updateStatistics((state) => {
      state.money.spent += value;
    });
  }

  increaseFinishedTickets(value: number = 1): void {
    this.gameStateService.updateStatistics((state) => {
      state.tickets.finished += value;
    });
  }

  increaseTotalPlaytime(): void {
    const diffMs = BALANCE.GAME_LOOP_INTERVAL;

    this.gameStateService.updateStatistics((state) => {
      state.playtime.total += diffMs;
    });
  }
}
