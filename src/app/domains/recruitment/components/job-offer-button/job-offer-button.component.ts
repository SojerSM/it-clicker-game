import { Component } from '@angular/core';
import { GameStateService } from '../../../../core/services/game-state.service';
import { HireService } from '../../services/hire.service';

@Component({
  selector: 'app-job-offer-button',
  imports: [],
  templateUrl: './job-offer-button.component.html',
  styleUrl: './job-offer-button.component.scss',
})
export class JobOfferButtonComponent {
  readonly PRICE: number = 50;

  constructor(private gameStateService: GameStateService, private hireService: HireService) {}

  get isAvailable(): boolean {
    return this.hasEnoughMoney();
  }

  publishOffer(): void {
    if (!this.hasEnoughMoney) return;

    this.hireService.hire();
    this.gameStateService.updateResource((state) => (state.money -= this.PRICE));
  }

  private hasEnoughMoney(): boolean {
    return this.gameStateService.resourceState().money >= this.PRICE;
  }
}
