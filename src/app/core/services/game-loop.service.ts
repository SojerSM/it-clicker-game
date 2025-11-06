import { Injectable, signal } from '@angular/core';
import { BALANCE } from '../config/state/balance';

@Injectable({ providedIn: 'root' })
export class GameLoopService {
  private readonly interval = BALANCE.GAME_LOOP_INTERVAL;
  readonly tick = signal(0);

  constructor() {
    this.start();
  }

  private start(): void {
    setInterval(() => {
      this.tick.update((value) => value + 1);
    }, this.interval);
  }
}
