import { Injectable, NgZone } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { GameState } from '../config/state/game-state.model';
import { GameStateBuilder } from './game-state-builder.service';
import { localStorageKeys } from '../config/localStorage';

@Injectable({ providedIn: 'root' })
export class GameSaveService {
  private readonly INTERVAL_MS: number = 5000;
  private autoSaveJob?: Subscription;

  constructor(private gameStateBuilder: GameStateBuilder, private zone: NgZone) {}

  startAutoSave(intervalMs: number = this.INTERVAL_MS): void {
    if (this.autoSaveJob) return;

    this.zone.runOutsideAngular(() => {
      this.autoSaveJob = interval(intervalMs).subscribe(() => {
        const state = this.gameStateBuilder.buildState();
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
    console.info('Item saved to local storage.');
    localStorage.setItem(localStorageKeys.gameState, JSON.stringify(state));
  }

  load(): GameState | null {
    const data = localStorage.getItem(localStorageKeys.gameState);
    return data ? JSON.parse(data) : null;
  }
}
