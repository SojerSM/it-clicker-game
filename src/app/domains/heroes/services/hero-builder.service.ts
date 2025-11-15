import { Injectable } from '@angular/core';
import { HeroRole } from '../types/enums/hero-role.enum';
import { HeroType } from '../types/enums/hero-type.enum';
import { Hero } from '../types/hero.model';

@Injectable({ providedIn: 'root' })
export class HeroBuilderService {
  build(): Hero {
    return {
      id: 'mocked-hero-01',
      type: HeroType.MINION,
      role: HeroRole.PROGRAMMER,
      name: 'Peter Lookatyou',
      avatar: 'assets/heroes/hero_male_avatar_02.png',
      lvl: 1,
      exp: 0,
      expRatio: 1,
      expToLevelUp: 50,
      baseRequiredExp: 50,
      stressFactor: 0.5,
      pps: 0.2,
    };
  }
}
