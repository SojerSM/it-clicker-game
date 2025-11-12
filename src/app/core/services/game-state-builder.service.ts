import { Injectable } from '@angular/core';
import { GameStateService } from './game-state.service';
import { GameState } from '../config/state/game-state.model';

@Injectable({ providedIn: 'root' })
export class GameStateBuilder {
  constructor(private gameStateService: GameStateService) {}

  buildState(): GameState {
    const state: GameState = {
      impact: this.gameStateService.impactState(),
      effects: this.gameStateService.effectState(),
      heroes: this.gameStateService.heroState(),
      resource: this.gameStateService.resourceState(),
      project: this.gameStateService.projectState(),
      tickets: this.gameStateService.ticketState(),
    };

    return state;
  }
}
