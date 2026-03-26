import { Injectable } from '@angular/core';
import { GameStateService } from '../../../../core/services/game-state.service';
import { BALANCE } from '../../../../core/config/state/balance';

@Injectable({ providedIn: 'root' })
export class EmailService {
  constructor(private gameStateService: GameStateService) {}

  /**
   * Attempts to add a new email to the state based on a probability check.
   *
   * On each game tick, a random number between 0 and 1 is generated.
   * If this value is lower than `state.probability`, a new email is received.
   */
  receiveNewEmail(): void {
    this.gameStateService.updateEmail((state) => {
      if (Math.random() < state.probability) {
        if (state.unanswered < state.maxSize) {
          state.unanswered += 1;
        }
      }
    });
  }

  answerEmail(): void {
    this.gameStateService.updateEmail((state) => {
      console.log('invoke');
      if (state.unanswered >= 1) {
        state.emailCp -= 1;

        if (state.emailCp === 0) {
          state.unanswered -= 1;
          state.emailCp = BALANCE.EMAIL_BASE_CP;
        }
      }
    });
  }
}
