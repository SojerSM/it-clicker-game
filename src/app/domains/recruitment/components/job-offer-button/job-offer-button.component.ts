import { Component } from '@angular/core';
import { GameStateService } from '../../../../core/services/game-state.service';
import { HireService } from '../../services/hire.service';
import { ResourcesService } from '../../../resources/resources.service';

@Component({
  selector: 'app-job-offer-button',
  imports: [],
  templateUrl: './job-offer-button.component.html',
  styleUrl: './job-offer-button.component.scss',
})
export class JobOfferButtonComponent {
  readonly PRICE: number = 50;

  constructor(
    private gameStateService: GameStateService,
    private hireService: HireService,
    private resourcesService: ResourcesService
  ) {}

  get isAvailable(): boolean {
    return this.hasEnoughMoney();
  }

  publishOffer(): void {
    if (!this.hasEnoughMoney) return;

    this.hireService.hire();
    this.resourcesService.decreaseMoney(this.PRICE);
  }

  private hasEnoughMoney(): boolean {
    return this.gameStateService.resourceState().money >= this.PRICE;
  }
}
