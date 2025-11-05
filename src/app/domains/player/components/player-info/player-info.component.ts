import { Component } from '@angular/core';
import { ProgressBarComponent } from '../../../../shared/components/progress-bar/progress-bar/progress-bar.component';
import { GameStateService } from '../../../../core/services/game-state.service';
import { Player } from '../../types/player.model';

@Component({
  selector: 'app-player-info',
  imports: [ProgressBarComponent],
  templateUrl: './player-info.component.html',
  styleUrl: './player-info.component.scss',
})
export class PlayerInfoComponent {
  constructor(private gameStateService: GameStateService) {}

  get remainingExp(): number {
    return (
      this.gameStateService.playerState().expToLevelUp - this.gameStateService.playerState().exp
    );
  }

  get player(): Player {
    return this.gameStateService.playerState();
  }
}
