import { Injectable, resource } from '@angular/core';
import { GameStateService } from '../../../../core/services/game-state.service';
import { HeroType } from '../../../heroes/types/enums/hero-type.enum';
import { Hero } from '../../../heroes/types/hero.model';
import { AttributeType } from '../types/enums/attribute-type.enum';
import { HeroAttribute } from '../types/hero-attribute';
import { ImpactService } from '../../../impact/impact.service';
import { AttributeTarget } from '../types/enums/attribute-target.enum';

@Injectable({ providedIn: 'root' })
export class AttributeService {
  constructor(private gameStateService: GameStateService, private impactService: ImpactService) {}

  purchase(attributeArg: HeroAttribute): void {
    const hero = this.gameStateService
      .heroState()
      .owned.find((hero) => hero.id === attributeArg.heroId);

    if (!hero) {
      throw new Error('Hero not found based on provided ' + attributeArg);
    }

    const attribute = hero.attributes.find((a) => a.id === attributeArg.id);

    if (attribute && !attribute.isPurchased) {
      this.gameStateService.updateHeroes((state) => {
        const targetHero = state.owned.find((h) => h.id === hero.id);

        if (targetHero) {
          const targetAttribute = targetHero.attributes.find((a) => a.id === attributeArg.id);

          if (targetAttribute) {
            targetAttribute.isPurchased = true;

            this.applyAttributeImpact(targetHero, targetAttribute);
            this.gameStateService.updateResource((resources) => {
              resources.money -= targetAttribute.price;
            });
          }
        }
      });

      this.impactService.recalculate();
    }
  }

  private applyAttributeImpact(targetHero: Hero, attribute: HeroAttribute) {
    switch (attribute.target) {
      case AttributeTarget.MPI: {
        this.gameStateService.updateImpact((state) => {
          state.organicMpi *= attribute.value;
        });
        break;
      }
      case AttributeTarget.PPS: {
        if (targetHero.type === HeroType.MINION) {
          targetHero.organicPps *= attribute.value;
          targetHero.totalPps *= attribute.value;
        }
        break;
      }
      case AttributeTarget.LEARNING_RATE: {
        targetHero.stats.learningRate *= attribute.value;
      }
    }
  }
}
