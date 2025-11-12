import { HeroRole } from './enums/hero-role.enum';
import { HeroStats } from './hero-stats.model';

export interface Hero extends HeroStats {
  id: string;
  role: HeroRole;
  name: string;
  avatar: string;
  lvl: number;
  exp: number;
  expToLevelUp: number;
}
