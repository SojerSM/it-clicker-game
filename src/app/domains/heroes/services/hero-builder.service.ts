import { Injectable } from '@angular/core';
import { BALANCE } from '../../../core/config/state/balance';
import { Gender } from '../../../shared/types/enums/gender.enum';
import { CEO_ATTRIBUTES } from '../../upgrades/attributes/presets/ceo-attributes';
import { AttributeMapperService } from '../../upgrades/attributes/services/attribute-mapper.service';
import { HeroRole } from '../types/enums/hero-role.enum';
import { HeroType } from '../types/enums/hero-type.enum';
import { Hero } from '../types/hero.model';
import { GameStateService } from '../../../core/services/game-state.service';

@Injectable({ providedIn: 'root' })
export class HeroBuilderService {
  private builders: Record<HeroRole, () => Hero> = {
    [HeroRole.CEO]: () => this.buildCEO(),
    [HeroRole.PROGRAMMER]: () => this.buildCEO(), // temporary workaround
  };

  constructor(
    private attributeMapper: AttributeMapperService,
    private gameStateService: GameStateService
  ) {}

  build(role: HeroRole): Hero {
    const builder = this.builders[role];

    if (!builder) {
      throw new Error('No builder for ' + role + ' role provided.');
    }

    return builder();
  }

  // temporary
  private buildCEO(): Hero {
    const id = 'hero-ceo';
    const avatarPath = 'assets/heroes/american/male/avatar_01.png';

    this.gameStateService.updateHeroes((state) => {
      state.occupiedAvatars.push(avatarPath);
    });

    return {
      id: id,
      type: HeroType.PLAYER,
      role: HeroRole.CEO,
      name: 'John',
      surname: 'Doe',
      gender: Gender.MALE,
      education: 'XD school',
      avatar: avatarPath,
      growth: {
        lvl: 1,
        exp: 0,
        expRatio: BALANCE.HERO_INITIAL_EXP_RATIO,
        expToLevelUp: 100,
        baseRequiredExp: 100,
      },
      stats: {
        baseStress: 0.5,
        stressFactor: 0.5,
        stressResistance: 0.2,
        learningRate: 1,
      },
      attributes: this.attributeMapper.getMappedClone(id, CEO_ATTRIBUTES),
    };
  }
}
