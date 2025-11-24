import { Injectable } from '@angular/core';
import { HeroRole } from '../types/enums/hero-role.enum';
import { HeroType } from '../types/enums/hero-type.enum';
import { Hero } from '../types/hero.model';
import { DEV_ATTRIBUTES } from '../../upgrades/attributes/presets/dev-attributes';
import { GameStateService } from '../../../core/services/game-state.service';
import { CEO_ATTRIBUTES } from '../../upgrades/attributes/presets/ceo-attributes';
import { AttributeMapperService } from '../../upgrades/attributes/services/attribute-mapper.service';

@Injectable({ providedIn: 'root' })
export class HeroBuilderService {
  private builders: Record<HeroRole, () => Hero> = {
    [HeroRole.CEO]: () => this.buildCEO(),
    [HeroRole.PROGRAMMER]: () => this.buildProgrammer(),
  };

  constructor(
    private gameStateService: GameStateService,
    private attributeMapper: AttributeMapperService
  ) {}

  build(role: HeroRole): Hero {
    const builder = this.builders[role];

    if (!builder) {
      throw new Error('No builder for ' + role + ' role provided.');
    }

    return builder();
  }

  private buildCEO(): Hero {
    const id = 'hero-ceo';

    return {
      id: id,
      type: HeroType.PLAYER,
      role: HeroRole.CEO,
      name: 'John Doe',
      avatar: 'assets/heroes/hero_male_avatar_01.png',
      growth: {
        lvl: 1,
        exp: 0,
        expRatio: 1,
        expToLevelUp: 100,
        baseRequiredExp: 100,
      },
      stats: {
        baseStress: 0.5,
        stressFactor: 0.5,
        stressResistance: 0.2,
      },
      attributes: this.attributeMapper.getMappedClone(id, CEO_ATTRIBUTES),
    };
  }

  private buildProgrammer(): Hero {
    const id = 'mocked-hero-'.concat(this.getNextHeroIdStringified());
    return {
      id: id,
      type: HeroType.MINION,
      role: HeroRole.PROGRAMMER,
      name: 'Peter Lookatyou',
      avatar: 'assets/heroes/hero_male_avatar_02.png',
      growth: {
        lvl: 1,
        exp: 0,
        expRatio: 1,
        expToLevelUp: 50,
        baseRequiredExp: 50,
      },
      stats: {
        baseStress: 0.5,
        stressFactor: 0.5,
        stressResistance: 0.03,
      },
      attributes: this.attributeMapper.getMappedClone(id, DEV_ATTRIBUTES),
      organicPps: 0.2,
      totalPps: 0.2,
    };
  }

  private getNextHeroIdStringified(): string {
    const heroesAmount = this.gameStateService.heroState().owned.length;

    return heroesAmount.toString();
  }
}
