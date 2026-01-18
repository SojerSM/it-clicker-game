import { Gender } from '../../../shared/types/enums/gender.enum';
import { HeroAttribute } from '../../upgrades/attributes/types/hero-attribute';
import { HeroRole } from './enums/hero-role.enum';
import { HeroGrowth } from './hero-growth.model';
import { HeroStats } from './hero-stats.model';

export interface HeroDetails {
  role: HeroRole;
  name: string;
  surname: string;
  gender: Gender;
  education: string;
  avatar: string;
  growth: HeroGrowth;
  stats: HeroStats;
  attributes: HeroAttribute[];
}
