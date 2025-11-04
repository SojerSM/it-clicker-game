import { Injectable } from '@angular/core';
import { GameStateService } from '../../core/services/game-state.service';

@Injectable({ providedIn: 'root' })
export class ResourcesService {
  constructor(private gameStateService: GameStateService) {}

  increaseMoney(value: number) {
    this.gameStateService.updateResource((state) => {
      state.money = state.money + value;
    });
  }

  decreaseMoney(value: number) {
    this.gameStateService.updateResource((state) => {
      const result = state.money - value;
      state.money = result >= 0 ? result : 0;
    });
  }
}
