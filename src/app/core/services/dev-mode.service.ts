import { Injectable } from '@angular/core';
import { GameStateService } from './game-state.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DevModeService {
  constructor(private gameStateService: GameStateService, private router: Router) {}

  addMoney(value: number) {
    this.gameStateService.updateResource((state) => {
      state.money += value;
    });
  }

  resetState(): void {
    localStorage.removeItem('gameState');
    window.location.href = '/';
  }
}
