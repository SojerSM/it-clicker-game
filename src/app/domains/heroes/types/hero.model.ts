import { HeroType } from './enums/hero-type.enum';
import { HeroDetails } from './hero-details.model';

export interface PlayerHero extends HeroDetails {
  id: string;
  type: HeroType.PLAYER;
}

export interface MinionHero extends HeroDetails {
  id: string;
  type: HeroType.MINION;
  organicPps: number;
  totalPps: number;
}

export type Hero = PlayerHero | MinionHero;
