import { Component, Input } from '@angular/core';
import { Hero } from '../../../types/hero.model';
import { TagComponent } from '../../../../../shared/components/tag/tag.component';
import { HeroType } from '../../../types/enums/hero-type.enum';
import { GameStateService } from '../../../../../core/services/game-state.service';
import { NumberFormat } from '../../../../../core/pipes/number-format.pipe';

interface HeroCardImpactData {
  label: string;
  value: number;
}

@Component({
  selector: 'app-hero-card-simplified',
  imports: [TagComponent, NumberFormat],
  templateUrl: './hero-card-simplified.component.html',
  styleUrl: './hero-card-simplified.component.scss',
})
export class HeroCardSimplifiedComponent {
  @Input({ required: true }) hero!: Hero;

  constructor(private gameStateService: GameStateService) {}

  get impact(): HeroCardImpactData {
    return this.hero.type === HeroType.MINION
      ? { label: 'PPS:', value: this.hero.totalPps }
      : { label: 'MPI:', value: this.gameStateService.impactState().totalMpi };
  }
}
