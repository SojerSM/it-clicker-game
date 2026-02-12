import { Injectable } from '@angular/core';
import { GameStateService } from './game-state.service';

@Injectable({ providedIn: 'root' })
export class DevModeService {
  constructor(private gameStateService: GameStateService) {}

  addMoney(value: number) {
    this.gameStateService.updateResource((state) => {
      state.money += value;
    });
  }
}
