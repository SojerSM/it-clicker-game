import { Component, Input } from '@angular/core';
import { GameStateService } from '../../../../core/services/game-state.service';
import { Hero } from '../../types/hero.model';
import { NumberFormat } from '../../../../core/pipes/number-format.pipe';
import { HeroType } from '../../types/enums/hero-type.enum';

@Component({
  selector: 'app-hero-stats',
  imports: [NumberFormat],
  templateUrl: './hero-stats.component.html',
  styleUrl: './hero-stats.component.scss',
})
export class HeroStatsComponent {
  @Input({ required: true }) hero!: Hero;

  constructor(private gameStateService: GameStateService) {}

  get impact(): number {
    const impact = this.gameStateService.impactState();

    return this.hero.type === HeroType.PLAYER ? impact.totalMpi : this.hero.totalPps;
  }

  get impactLabel(): string {
    const playerLabel = 'Manual Productivity Index';
    const minionLabel = 'Productivity Per Second';

    return this.hero.type === HeroType.PLAYER ? playerLabel : minionLabel;
  }
}
