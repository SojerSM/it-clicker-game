import { HeroAttribute } from '../../upgrades/attributes/types/hero-attribute';
import { HeroRole } from './enums/hero-role.enum';
import { HeroType } from './enums/hero-type.enum';
import { MinionStats } from './minion-stats.model';

export interface PlayerHero {
  id: string;
  type: HeroType.PLAYER;
  role: HeroRole;
  name: string;
  avatar: string;
  lvl: number;
  exp: number;
  expRatio: number;
  expToLevelUp: number;
  baseRequiredExp: number;
  stressFactor: number;
  attributes: HeroAttribute[];
}

export interface MinionHero extends MinionStats {
  id: string;
  type: HeroType.MINION;
  role: HeroRole;
  name: string;
  avatar: string;
  lvl: number;
  exp: number;
  expRatio: number;
  expToLevelUp: number;
  baseRequiredExp: number;
  stressFactor: number;
  attributes: HeroAttribute[];
}

export type Hero = PlayerHero | MinionHero;
