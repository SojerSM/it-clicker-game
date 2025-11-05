import { EffectSource } from './enum/effect-source.enum';
import { EffectTarget } from './enum/effect-target.enum';
import { EffectType } from './enum/effect-type.enum';

export interface Effect {
  id: string;
  source: EffectSource;
  type: EffectType;
  target: EffectTarget;
  value: number;
  duration?: number;
  createdAt: number;
}
