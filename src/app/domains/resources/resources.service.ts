import { Injectable } from '@angular/core';
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
}
