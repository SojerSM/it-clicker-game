import { Injectable } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import { HeroType } from '../../heroes/types/enums/hero-type.enum';
import { HeroRole } from '../../heroes/types/enums/hero-role.enum';
import { HeroGeneratorService } from '../../heroes/services/hero-generator.service';
import { StatisticService } from '../../statistics/services/statistic.service';

@Injectable({ providedIn: 'root' })
export class HireService {
  constructor(
    private gameStateService: GameStateService,
    private heroGeneratorService: HeroGeneratorService,
    private statisticService: StatisticService
  ) {}

  hire(): void {
    const hero = this.heroGeneratorService.generateHero(HeroRole.PROGRAMMER);

    this.gameStateService.updateHeroes((state) => {
      state.owned.push(hero);
    });
    this.statisticService.increaseRecruitedHeroes();

    if (hero.type === HeroType.MINION) {
      this.gameStateService.updateImpact((state) => {
        state.totalPps += hero.organicPps;
      });
    }
  }
}
