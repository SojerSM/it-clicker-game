import { HeroStats } from '../../../shared/types/hero-stats';

export interface Player extends HeroStats {
  name: string;
  avatar: string;
  lvl: number;
  exp: number;
  expToLevelUp: number;
}
