import { Injectable, signal } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import { INITIAL_GAME_STATE } from '../../../core/config/state/game-state';
import { BALANCE } from '../../../core/config/state/balance';
import { PlayerState } from '../../../core/types/state.model';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  constructor(private gameStateService: GameStateService) {}

  increaseExp(value: number): void {
    this.gameStateService.updatePlayer((state) => {
      state.exp += value;

      if (state.exp >= state.expToLevelUp) {
        this.levelUp(state);
      }
    });
  }

  private levelUp(state: PlayerState): void {
    state.exp = 0;
    state.lvl += 1;
    state.expToLevelUp = this.calcNextRequiredExp(state.lvl);
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
