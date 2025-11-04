import { effect, Injectable, untracked } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import { Player } from '../types/player.model';
import { INITIAL_GAME_STATE } from '../../../core/config/state/game-state';

/**
 * Service working in the background.
 *
 * Initialized directly in main.ts with appRef.injector
 */
@Injectable({ providedIn: 'root' })
export class PlayerStatsService {
  constructor(private gameStateService: GameStateService) {
    effect(() => {
      const player = this.gameStateService.playerState();

      this.handleStressFactorEffect(player);
    });
  }

  private handleStressFactorEffect(player: Player): void {
    const higherBreakpoint = 0.6;
    const lowerBreakpoint = 0.4;
    let mpiTarget = INITIAL_GAME_STATE.impact.mpi;

    if (player.stressFactor >= higherBreakpoint) {
      // high stress -> lower MPI
      const normalized = (player.stressFactor - higherBreakpoint) / (1 - higherBreakpoint);
      mpiTarget -= Math.pow(normalized, 1.6) * 0.5;
    } else if (player.stressFactor <= lowerBreakpoint) {
      // low stress -> higher MPI
      const normalized = 1 - player.stressFactor / lowerBreakpoint;
      mpiTarget += Math.pow(normalized, 1.6) * 0.5;
    }

    const currentMpi = untracked(() => this.gameStateService.impactState().mpi);

    if (mpiTarget !== currentMpi) {
      this.gameStateService.updateImpact((impact) => {
        impact.mpi = Number(mpiTarget.toFixed(2));
      });
    }
  }
}
