import { Injectable, signal } from '@angular/core';
import { GameStateService } from '../../core/services/game-state.service';

@Injectable({ providedIn: 'root' })
export class ResourcesService {
  constructor(private gameStateService: GameStateService) {}

  increaseMoney(value: number) {
    this.gameStateService.updateState((state) => {
      state.resource.money = state.resource.money + value;
    });
  }

  decreaseMoney(value: number) {
    this.gameStateService.updateState((state) => {
      const result = state.resource.money - value;
      state.resource.money = result >= 0 ? result : 0;
    });
  }

  increaseExp(value: number) {
    this.gameStateService.updateState((state) => {
      state.resource.exp = state.resource.exp + value;
    });
  }

  decreaseExp(value: number) {
    this.gameStateService.updateState((state) => {
      const result = state.resource.exp - value;
      state.resource.exp = result >= 0 ? result : 0;
    });
  }
}
