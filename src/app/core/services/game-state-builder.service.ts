import { Injectable } from '@angular/core';
import { GameStateService } from './game-state.service';
import { GameState } from '../config/state/game-state.model';

@Injectable({ providedIn: 'root' })
export class GameStateBuilder {
  constructor(private gameStateService: GameStateService) {}

  buildState(): GameState {
    return {
      impact: structuredClone(this.gameStateService.impactState()),
      effects: structuredClone(this.gameStateService.effectState()),
      heroes: structuredClone(this.gameStateService.heroState()),
      resource: structuredClone(this.gameStateService.resourceState()),
      project: structuredClone(this.gameStateService.projectState()),
      tickets: structuredClone(this.gameStateService.ticketState()),
    };
  }
}
