import { Component, Input } from '@angular/core';
import { GameStateService } from '../../../../core/services/game-state.service';
import { Hero } from '../../types/hero.model';
import { NumberFormat } from '../../../../core/pipes/number-format.pipe';

@Component({
  selector: 'app-hero-stats-overview',
  imports: [NumberFormat],
  templateUrl: './hero-stats-overview.component.html',
  styleUrl: './hero-stats-overview.component.scss',
})
export class HeroStatsOverviewComponent {
  @Input({ required: true }) hero!: Hero;

  constructor(private gameStateService: GameStateService) {}

  get mpi(): number {
    return this.gameStateService.impactState().mpi;
  }
}
