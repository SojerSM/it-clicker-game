import { effect, Injectable } from '@angular/core';
import { GameStateService } from '../../core/services/game-state.service';
import { TicketService } from '../progress/tickets/services/ticket.service';
import { HeroType } from '../heroes/types/enums/hero-type.enum';

@Injectable({ providedIn: 'root' })
export class ImpactService {
  constructor(private ticketService: TicketService, private gameStateService: GameStateService) {}

  applyPpsDamage(): void {
    const totalPps = this.gameStateService.impactState().totalPps;
    const tickets = this.gameStateService.ticketState().active;

    if (tickets.length > 0) {
      this.ticketService.applyProgress(totalPps, tickets[0].id);
    }
  }

  recalculate(): void {
    const heroes = this.gameStateService.heroState().owned;

    this.gameStateService.updateImpact((state) => {
      let totalPps: number = 0;

      heroes.forEach((hero) => {
        if (hero.type === HeroType.MINION) {
          totalPps += hero.totalPps;
        }
      });

      state.totalPps = totalPps;
      state.totalMpi = state.organicMpi;
    });
  }
}
