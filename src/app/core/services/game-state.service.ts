import { Injectable, signal, WritableSignal } from '@angular/core';
import { INITIAL_GAME_STATE } from '../config/state/game-state';
import {
  ImpactState,
  PlayerState,
  ProjectState,
  ResourceState,
  TicketState,
} from '../types/state.model';
import { GameState } from '../config/state/game-state.model';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  readonly impactState = signal<ImpactState>(INITIAL_GAME_STATE.impact);
  readonly playerState = signal<PlayerState>(INITIAL_GAME_STATE.player);
  readonly resourceState = signal<ResourceState>(INITIAL_GAME_STATE.resource);
  readonly projectState = signal<ProjectState>(INITIAL_GAME_STATE.project);
  readonly ticketState = signal<TicketState>(INITIAL_GAME_STATE.tickets);

  reset(): void {
    this.impactState.set(INITIAL_GAME_STATE.impact);
    this.playerState.set(INITIAL_GAME_STATE.player);
    this.resourceState.set(INITIAL_GAME_STATE.resource);
    this.projectState.set(INITIAL_GAME_STATE.project);
    this.ticketState.set(INITIAL_GAME_STATE.tickets);
  }

  setState(state: GameState): void {
    this.impactState.set(state.impact);
    this.playerState.set(state.player);
    this.resourceState.set(state.resource);
    this.projectState.set(state.project);
    this.ticketState.set(state.tickets);
  }

  setImpact(impact: ImpactState): void {
    this.impactState.set(impact);
  }

  setPlayer(player: PlayerState): void {
    this.playerState.set(player);
  }

  setResource(resource: ResourceState): void {
    this.resourceState.set(resource);
  }

  setProject(project: ProjectState): void {
    this.projectState.set(project);
  }

  setTicket(ticket: TicketState): void {
    this.ticketState.set(ticket);
  }

  updateImpact(mutator: (impact: ImpactState) => void) {
    this.updateSlice(this.impactState, mutator);
  }

  updatePlayer(mutator: (player: PlayerState) => void) {
    this.updateSlice(this.playerState, mutator);
  }

  updateResource(mutator: (resource: ResourceState) => void) {
    this.updateSlice(this.resourceState, mutator);
  }

  updateProject(mutator: (project: ProjectState) => void) {
    this.updateSlice(this.projectState, mutator);
  }

  updateTicket(mutator: (ticket: TicketState) => void) {
    this.updateSlice(this.ticketState, mutator);
  }

  private updateSlice<T>(slice: WritableSignal<T>, mutator: (state: T) => void): void {
    slice.update((prev) => {
      const next = structuredClone(prev);
      mutator(next);
      return next;
    });
  }
}
