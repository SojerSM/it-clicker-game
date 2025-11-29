import { HeroAttribute } from '../../upgrades/attributes/types/hero-attribute';
import { HeroRole } from './enums/hero-role.enum';
import { HeroGrowth } from './hero-growth.model';
import { HeroStats } from './hero-stats.model';

export interface HeroDetails {
  role: HeroRole;
  name: string;
  avatar: string;
  growth: HeroGrowth;
  stats: HeroStats;
  attributes: HeroAttribute[];
}
