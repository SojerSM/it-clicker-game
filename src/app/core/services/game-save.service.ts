import { Injectable, NgZone } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { GameStateService } from './game-state.service';
import { GameState } from '../config/state/game-state.model';

@Injectable({ providedIn: 'root' })
export class GameSaveService {
  private readonly STORAGE_KEY: string = 'gameState';
  private readonly INTERVAL_MS: number = 1000;
  private autoSaveJob?: Subscription;

  constructor(private gameStateService: GameStateService, private zone: NgZone) {}

  startAutoSave(intervalMs: number = this.INTERVAL_MS): void {
    if (this.autoSaveJob) return;

    this.zone.runOutsideAngular(() => {
      this.autoSaveJob = interval(intervalMs).subscribe(() => {
        const state = this.gameStateService.getState();
        this.save(state);
      });
    });
  }

  stopAutoSave(): void {
    if (this.autoSaveJob) {
      this.autoSaveJob.unsubscribe();
      this.autoSaveJob = undefined;
    }
  }

  save(state: GameState) {
    console.info('Game state saved to local storage.');
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }

  load(): GameState | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
}
