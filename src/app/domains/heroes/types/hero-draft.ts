import { Gender } from '../../../shared/types/enums/gender.enum';
import { HeroOrigin } from './enums/hero-origin.enum';
import { HeroRole } from './enums/hero-role.enum';

export interface MinionDraft extends HeroDraft {
  id: string;
  role: HeroRole;
}

export interface HeroDraft {
  avatar: string;
  name: string;
  gender: Gender;
  origin: HeroOrigin;
  surname: string;
  education: string;
}
