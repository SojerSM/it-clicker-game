import { Injectable } from '@angular/core';
import { GameStateService } from '../../../../core/services/game-state.service';
import { HeroAttribute } from '../types/hero-attribute';

@Injectable({ providedIn: 'root' })
export class AttributeStackService {
  constructor(private gameStateService: GameStateService) {}

  getAllAttributesInOrder(): HeroAttribute[] {
    const heroes = this.gameStateService.heroState().owned;
    let stackedAttributes: HeroAttribute[] = [];

    heroes.forEach((hero) => {
      hero.attributes.forEach((attribute) => {
        stackedAttributes.push(attribute);
      });
    });

    stackedAttributes.sort((a, b) => a.price - b.price);

    return stackedAttributes;
  }
}
