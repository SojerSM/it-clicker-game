import { EffectSource } from './enum/effect-source.enum';
import { EffectType } from './enum/effect-type.enum';

export interface Effect {
  id: string;
  source: EffectSource;
  type: EffectType;
  target: string;
  value: number;
  duration?: number;
  createdAt: number;
}
