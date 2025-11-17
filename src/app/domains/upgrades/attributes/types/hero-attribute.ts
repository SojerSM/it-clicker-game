import { AttributeType } from './enums/attribute-type.enum';
import { AttributeTarget } from './enums/attribute-target.enum';
import { HeroRole } from '../../../heroes/types/enums/hero-role.enum';

export interface HeroAttribute {
  id: string;
  heroId?: string;
  heroRole: HeroRole;
  type: AttributeType;
  target: AttributeTarget;
  title: string;
  description: string;
  value: number;
  imgBadge: string;
  price: number;
  isPurchased: boolean;
}
