import { Injectable } from '@angular/core';
import { BALANCE } from '../../../core/config/state/balance';
import { GameStateService } from '../../../core/services/game-state.service';
import { Gender } from '../../../shared/types/enums/gender.enum';
import { DEV_ATTRIBUTES } from '../../upgrades/attributes/presets/dev-attributes';
import { AttributeMapperService } from '../../upgrades/attributes/services/attribute-mapper.service';
import { HERO_AVATARS } from '../data/hero-avatars';
import { HERO_PARTS } from '../data/hero-parts';
import { HeroOrigin } from '../types/enums/hero-origin.enum';
import { HeroRole } from '../types/enums/hero-role.enum';
import { HeroType } from '../types/enums/hero-type.enum';
import { Hero } from '../types/hero.model';
import { HeroBuilderService } from './hero-builder.service';
import { HeroDraft, MinionDraft } from '../types/hero-draft';

@Injectable({ providedIn: 'root' })
export class HeroGeneratorService {
  constructor(
    private gameStateService: GameStateService,
    private attributeMapper: AttributeMapperService,
    private heroBuilderService: HeroBuilderService
  ) {}

  generateDraft(
    role: HeroRole,
    origin: HeroOrigin = this.randomizeOrigin(),
    gender: Gender = this.randomizeGender()
  ): HeroDraft {
    const heroParts = HERO_PARTS[origin];

    const avatar = this.randomizeAvatar(origin, gender);
    const name = this.randomFrom(heroParts.name[gender]);
    const surname = this.randomFrom(heroParts.surname);
    const education = this.randomizeEducation(origin);

    return {
      avatar,
      name,
      gender,
      origin,
      surname,
      education,
    };
  }

  generateHero(
    role: HeroRole,
    origin: HeroOrigin = this.randomizeOrigin(),
    gender: Gender = this.randomizeGender()
  ): Hero {
    const heroParts = HERO_PARTS[origin];

    const avatar = this.randomizeAvatar(origin, gender);
    const name = this.randomFrom(heroParts.name[gender]);
    const surname = this.randomFrom(heroParts.surname);
    const education = this.randomizeEducation(origin);

    this.gameStateService.updateHeroes((state) => state.occupiedAvatars.push(avatar));

    // CEO
    if (role === HeroRole.CEO) {
      const ceoDraft: HeroDraft = { avatar, name, surname, gender, origin, education };

      return this.heroBuilderService.buildCEO(ceoDraft);
    }

    // OTHERS
    const id = 'hero-'.concat(this.gameStateService.heroState().owned.length.toString());
    const minionDraft: MinionDraft = { id, role, avatar, name, surname, gender, education, origin };

    return this.heroBuilderService.buildMinion(minionDraft);
  }

  /**
   * Randomize certain education based on recruitment effectiveness 0 - 1 with
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
