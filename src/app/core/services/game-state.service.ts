import { Injectable, signal, WritableSignal } from '@angular/core';
import { INITIAL_GAME_STATE } from '../config/state/game-state';
import { GameState } from '../config/state/game-state.model';
import {
  EffectState,
  HeroState,
  ImpactState,
  ProjectState,
  ResourceState,
  TicketState,
} from '../types/state.model';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  readonly impactState = signal<ImpactState>(INITIAL_GAME_STATE.impact);
  readonly effectState = signal<EffectState>(INITIAL_GAME_STATE.effects);
  readonly heroState = signal<HeroState>(INITIAL_GAME_STATE.heroes);
  readonly resourceState = signal<ResourceState>(INITIAL_GAME_STATE.resource);
  readonly projectState = signal<ProjectState>(INITIAL_GAME_STATE.project);
  readonly ticketState = signal<TicketState>(INITIAL_GAME_STATE.tickets);

  reset(): void {
    this.impactState.set(INITIAL_GAME_STATE.impact);
    this.effectState.set(INITIAL_GAME_STATE.effects);
    this.heroState.set(INITIAL_GAME_STATE.heroes);
    this.resourceState.set(INITIAL_GAME_STATE.resource);
    this.projectState.set(INITIAL_GAME_STATE.project);
    this.ticketState.set(INITIAL_GAME_STATE.tickets);
  }

  setState(state: GameState): void {
    this.impactState.set(state.impact);
    this.effectState.set(state.effects);
    this.heroState.set(state.heroes);
    this.resourceState.set(state.resource);
    this.projectState.set(state.project);
    this.ticketState.set(state.tickets);
  }

  setImpact(impact: ImpactState): void {
    this.impactState.set(impact);
  }

  setEffects(effects: EffectState): void {
    this.effectState.set(effects);
  }

  setHeroes(hero: HeroState): void {
    this.heroState.set(hero);
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

  updateEffects(mutator: (effects: EffectState) => void) {
    this.updateSlice(this.effectState, mutator);
  }

  updateHeroes(mutator: (hero: HeroState) => void) {
    this.updateSlice(this.heroState, mutator);
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
