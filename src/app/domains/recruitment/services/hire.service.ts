import { Injectable } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import { HeroType } from '../../heroes/types/enums/hero-type.enum';
import { HeroRole } from '../../heroes/types/enums/hero-role.enum';
import { HeroGeneratorService } from '../../heroes/services/hero-generator.service';
import { StatisticService } from '../../statistics/services/statistic.service';
import { HeroSlotService } from '../../heroes/services/hero-slot.service';

@Injectable({ providedIn: 'root' })
export class HireService {
  constructor(
    private gameStateService: GameStateService,
    private heroGeneratorService: HeroGeneratorService,
    private statisticService: StatisticService,
    private heroSlotService: HeroSlotService
  ) {}

  hire(): void {
    const hero = this.heroGeneratorService.generateHero(HeroRole.PROGRAMMER);

    this.gameStateService.updateHeroes((state) => {
      state.owned.push(hero);
    });
    this.statisticService.increaseRecruitedHeroes();
    this.heroSlotService.decreaseSlots();

    if (hero.type === HeroType.MINION) {
      this.gameStateService.updateImpact((state) => {
        state.totalPps += hero.organicPps;
      });
    }
  }
}
