import { Injectable } from '@angular/core';
import { HeroAttribute } from '../types/hero-attribute';

@Injectable({ providedIn: 'root' })
export class AttributeMapperService {
  getMappedClone(heroId: string, attributes: HeroAttribute[]): HeroAttribute[] {
    return attributes.map((attribute) => {
      return { ...attribute, heroId: heroId };
    });
  }
}
