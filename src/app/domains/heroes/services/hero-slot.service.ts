import { Injectable } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';

@Injectable({ providedIn: 'root' })
export class HeroSlotService {
  constructor(private gameStateService: GameStateService) {}

  increaseSlots(amount: number = 1): void {
    this.gameStateService.updateHeroes((state) => {
      state.slots += amount;
    });
  }

  decreaseSlots(amount: number = 1): void {
    const currentSlots = this.gameStateService.heroState().slots;

    if (currentSlots <= 0) return;

    this.gameStateService.updateHeroes((state) => {
      state.slots -= amount;
    });
  }
}
