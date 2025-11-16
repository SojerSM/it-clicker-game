import { Injectable } from '@angular/core';
import { GameStateService } from '../../../../core/services/game-state.service';
import { HeroType } from '../../../heroes/types/enums/hero-type.enum';
import { Hero } from '../../../heroes/types/hero.model';
import { AttributeType } from '../types/enums/attribute-type.enum';
import { HeroAttribute } from '../types/hero-attribute';
import { ImpactService } from '../../../impact/impact.service';

@Injectable({ providedIn: 'root' })
export class AttributeService {
  constructor(private gameStateService: GameStateService, private impactService: ImpactService) {}

  purchase(attribute: HeroAttribute, hero: Hero): void {
    if (!hero.purchasedAttributes.includes(attribute.id)) {
      this.gameStateService.updateHeroes((state) => {
        const targetHero = state.owned.find((h) => h.id === hero.id);

        if (targetHero) {
          this.applyAttributeImpact(targetHero, attribute);
          this.gameStateService.updateResource((resources) => {
            resources.money -= attribute.price;
          });
        }
      });

      this.impactService.recalculate();
    }
  }

  private applyAttributeImpact(targetHero: Hero, attribute: HeroAttribute) {
    targetHero.purchasedAttributes.push(attribute.id);

    if (targetHero.type === HeroType.MINION) {
      switch (attribute.type) {
        case AttributeType.ADD: {
          targetHero.organicPps += attribute.value;
          targetHero.totalPps += attribute.value;
          break;
        }
        case AttributeType.MULTIPLY: {
          targetHero.organicPps *= attribute.value;
          targetHero.totalPps *= attribute.value;
          break;
        }
      }
    } else if (targetHero.type === HeroType.PLAYER) {
      switch (attribute.type) {
        case AttributeType.ADD: {
          this.gameStateService.updateImpact((state) => {
            state.organicMpi += attribute.value;
          });
          break;
        }
        case AttributeType.MULTIPLY: {
          this.gameStateService.updateImpact((state) => {
            state.organicMpi *= attribute.value;
          });
        }
      }
    }
  }
}
