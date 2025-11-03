import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { GameState } from '../config/state/game-state.model';
import { INITIAL_GAME_STATE } from '../config/state/game-state';
import { Ticket } from '../../domains/progress/tickets/types/ticket.model';
import { Project } from '../../domains/progress/projects/types/project.model';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  readonly state = signal<GameState>(INITIAL_GAME_STATE);

  tickets(): Signal<Ticket[]> {
    return computed(() => this.state().tickets.current);
  }

  project(): Signal<Project> {
    return computed(() => this.state().project.current);
  }

  impact(): Signal<{ mpi: number; pps: number }> {
    return computed(() => this.state().impact);
  }

  resources(): Signal<{ money: number }> {
    return computed(() => this.state().resource);
  }

  getState(): GameState {
    return this.state();
  }

  setState(newState: GameState): void {
    this.state.set(newState);
  }

  updateState(mutator: (state: GameState) => void) {
    this.state.update((prev) => {
      const next = structuredClone(prev);
      mutator(next);
      return next;
    });
  }

  reset(): void {
    this.state.set(INITIAL_GAME_STATE);
  }
}
