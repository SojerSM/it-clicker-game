import { Injectable } from '@angular/core';
import { BALANCE } from '../../../core/config/state/balance';
import { GameStateService } from '../../../core/services/game-state.service';
import { CEO_ATTRIBUTES } from '../../upgrades/attributes/presets/ceo-attributes';
import { AttributeMapperService } from '../../upgrades/attributes/services/attribute-mapper.service';
import { HeroRole } from '../types/enums/hero-role.enum';
import { HeroType } from '../types/enums/hero-type.enum';
import { Hero } from '../types/hero.model';
import id from '@angular/common/locales/id';
import { DEV_ATTRIBUTES } from '../../upgrades/attributes/presets/dev-attributes';
import { HeroDraft, MinionDraft } from '../types/hero-draft';

@Injectable({ providedIn: 'root' })
export class HeroBuilderService {
  constructor(
    private attributeMapper: AttributeMapperService,
    private gameStateService: GameStateService
  ) {}

  buildCEO(draft: HeroDraft): Hero {
    const id = 'hero-ceo';
    const avatarPath = 'assets/images/heroes/american/male/avatar_01.png';

    this.gameStateService.updateHeroes((state) => {
      state.occupiedAvatars.push(avatarPath);
    });

    return {
      id: id,
      type: HeroType.PLAYER,
      role: HeroRole.CEO,
      name: draft.name,
      surname: draft.surname,
      gender: draft.gender,
      education: draft.education,
      avatar: draft.avatar,
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

  buildMinion(draft: MinionDraft): Hero {
    this.gameStateService.updateHeroes((state) => {
      state.occupiedAvatars.push(draft.avatar);
    });

    return {
      id: draft.id,
      type: HeroType.MINION,
      role: draft.role,
      name: draft.name,
      surname: draft.surname,
      gender: draft.gender,
      education: draft.education,
      avatar: draft.avatar,
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
      attributes: this.attributeMapper.getMappedClone(draft.id, DEV_ATTRIBUTES),
      organicPps: 0.2,
      totalPps: 0.2,
    };
  }
}
