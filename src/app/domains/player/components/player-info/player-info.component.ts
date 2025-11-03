import { Component } from '@angular/core';
import { ProgressBarComponent } from '../../../../shared/components/progress-bar/progress-bar/progress-bar.component';
import { Player } from '../../types/player.model';

@Component({
  selector: 'app-player-info',
  imports: [ProgressBarComponent],
  templateUrl: './player-info.component.html',
  styleUrl: './player-info.component.scss',
})
export class PlayerInfoComponent {
  player: Player = {
    name: 'John Doe',
    avatar: 'assets/player/player_male_avatar_01.png',
    lvl: 1,
    expToLevelUp: 100,
    exp: 0,
  };

  get remainingExp(): number {
    return this.player.expToLevelUp - this.player.exp;
  }
}
