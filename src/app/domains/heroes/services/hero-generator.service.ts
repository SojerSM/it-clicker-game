import { Injectable } from '@angular/core';
import { HeroOrigin } from '../types/enums/hero-origin.enum';
import { Gender } from '../../../shared/types/enums/gender.enum';
import { HERO_PARTS } from '../data/hero-parts';
import { GameStateService } from '../../../core/services/game-state.service';
import { BALANCE } from '../../../core/config/state/balance';
import { DEV_ATTRIBUTES } from '../../upgrades/attributes/presets/dev-attributes';
import { HeroRole } from '../types/enums/hero-role.enum';
import { HeroType } from '../types/enums/hero-type.enum';
import { Hero } from '../types/hero.model';
import { AttributeMapperService } from '../../upgrades/attributes/services/attribute-mapper.service';
import { HERO_AVATARS } from '../data/hero-avatars';

@Injectable({ providedIn: 'root' })
export class HeroGeneratorService {
  constructor(
    private gameStateService: GameStateService,
    private attributeMapper: AttributeMapperService
  ) {}

  generate(role: HeroRole): Hero {
    const origin = this.randomizeOrigin();
    const gender = this.randomizeGender();
    const avatar = this.randomizeAvatar(origin, gender);

    const heroParts = HERO_PARTS[origin];

    const name = this.randomFrom(heroParts.name[gender]);
    const surname = this.randomFrom(heroParts.surname);
    const education = this.randomizeEducation(origin);

    const id = 'mocked-hero-'.concat(this.gameStateService.heroState().owned.length.toString());

    this.gameStateService.updateHeroes((state) => state.occupiedAvatars.push(avatar));
    console.log(this.gameStateService.heroState().occupiedAvatars);

    return {
      id: id,
      type: HeroType.MINION,
      role,
      name,
      surname,
      gender,
      education,
      avatar,
      growth: {
        lvl: 1,
        exp: 0,
        expRatio: BALANCE.HERO_INITIAL_EXP_RATIO,
        expToLevelUp: 50,
        baseRequiredExp: 50,
      },
      stats: {
        baseStress: 0.5,
        stressFactor: 0.5,
        stressResistance: 0.03,
        learningRate: 0.5,
      },
      attributes: this.attributeMapper.getMappedClone(id, DEV_ATTRIBUTES),
      organicPps: 0.2,
      totalPps: 0.2,
    };
  }

  /**
   * Randomize certain education based on recruitment effectiveness 0 - 1, based on
   * weighted random selection. Manipulate `sigma` parameter to modify balance.
   *
   * @param origin randomized origin
   * @returns final education name
   */
  private randomizeEducation(origin: HeroOrigin): string {
    const effectiveness = this.gameStateService.recruitmentState().effectiveness;

    const e = Math.max(0, Math.min(1, effectiveness));
    const sigma = 0.25;

    const gaussian = (x: number, mean: number) =>
      Math.exp(-Math.pow(x - mean, 2) / (2 * sigma * sigma));

    const weights = {
      meme: gaussian(e, 0),
      regular: gaussian(e, 0.5),
      prestigious: gaussian(e, 1),
    };

    const total = weights.meme + weights.regular + weights.prestigious;
    const roll = Math.random() * total;
    const educations = HERO_PARTS[origin].education;

    if (roll < weights.meme) {
      return this.randomFrom(educations.meme);
    }
    if (roll < weights.meme + weights.regular) {
      return this.randomFrom(educations.regular);
    }
    return this.randomFrom(educations.prestigious);
  }

  private randomizeOrigin(): HeroOrigin {
    const values = Object.values(HeroOrigin);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
  }

  private randomizeGender(): Gender {
    const values = Object.values(Gender);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
  }

  private randomizeAvatar(origin: string, gender: string): string {
    const pool = HERO_AVATARS[origin][gender];
    const occupiedAvatars = this.gameStateService.heroState().occupiedAvatars;
    const availableAvatars = pool.filter((avatar) => !occupiedAvatars.includes(avatar));

    // in case if there's no available avatars (temporary)
    const source = availableAvatars.length > 0 ? availableAvatars : pool;

    return source[Math.floor(Math.random() * source.length)];
  }

  private randomFrom<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}
