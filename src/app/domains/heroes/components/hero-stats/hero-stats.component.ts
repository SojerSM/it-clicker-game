import { Component, Input } from '@angular/core';
import { GameStateService } from '../../../../core/services/game-state.service';
import { Hero } from '../../types/hero.model';
import { NumberFormat } from '../../../../core/pipes/number-format.pipe';
import { HeroType } from '../../types/enums/hero-type.enum';
import { TranslatePipe } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-hero-stats',
  imports: [NumberFormat, TranslatePipe, UpperCasePipe],
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
    const playerLabel = 'impact.mpi';
    const minionLabel = 'impact.pps';

    return this.hero.type === HeroType.PLAYER ? playerLabel : minionLabel;
  }
}
