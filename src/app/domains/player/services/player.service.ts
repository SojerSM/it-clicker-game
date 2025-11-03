import { Injectable, signal } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import { INITIAL_GAME_STATE } from '../../../core/config/state/game-state';
import { BALANCE } from '../../../core/config/state/balance';
import { GameState } from '../../../core/config/state/game-state.model';

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

    const newRequiredExp =
      Math.pow(state.player.lvl, BALANCE.PLAYER_REQUIRED_EXP_MULTIPLIER) *
      INITIAL_GAME_STATE.player.expToLevelUp;

    state.player.expToLevelUp = Math.floor(newRequiredExp);
  }
}
