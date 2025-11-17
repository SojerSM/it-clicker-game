import { Component, Input } from '@angular/core';
import { HeroAttribute } from '../../types/hero-attribute';
import { GameStateService } from '../../../../../core/services/game-state.service';
import { AttributeService } from '../../services/attribute.service';
import { Hero } from '../../../../heroes/types/hero.model';

@Component({
  selector: 'app-attribute',
  imports: [],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.scss',
})
export class AttributeComponent {
  @Input({ required: true }) attribute!: HeroAttribute;

  constructor(
    private gameStateService: GameStateService,
    private attributeService: AttributeService
  ) {}

  get isAffordable(): boolean {
    const money = this.gameStateService.resourceState().money;

    return money >= this.attribute.price ? true : false;
  }

  onPurchase(): void {
    if (this.isAffordable) {
      this.attributeService.purchase(this.attribute);
    }
  }
}
