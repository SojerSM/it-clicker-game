import { Injectable, signal } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import { INITIAL_GAME_STATE } from '../../../core/config/state/game-state';
import { BALANCE } from '../../../core/config/state/balance';
import { GameState } from '../../../core/config/state/game-state.model';
import { PlayerStatsService } from './player-stats.service';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  constructor(private gameStateService: GameStateService) {}

  increaseExp(value: number): void {
    this.gameStateService.updateState((state) => {
      state.player.exp += value;

      if (state.player.exp >= state.player.expToLevelUp) {
        this.levelUp(state);
      }
    });
  }

  private levelUp(state: GameState): void {
    state.player.exp = 0;
    state.player.lvl += 1;
    state.player.expToLevelUp = this.calcNextRequiredExp(state.player.lvl);
  }

  private calcNextRequiredExp(lvl: number): number {
    const baseExp = INITIAL_GAME_STATE.player.expToLevelUp;

    // hybrid: slow growth at the beginning and rapid growth further on
    const newRequiredExp =
      baseExp *
      (Math.pow(lvl - 1, BALANCE.PLAYER_REQUIRED_EXP_MULTIPLIER) * 0.5 + Math.exp(lvl / 20));

    return Math.round(newRequiredExp);
  }
}
