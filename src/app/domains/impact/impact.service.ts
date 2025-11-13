import { Injectable } from '@angular/core';
import { TicketService } from '../progress/tickets/services/ticket.service';
import { GameStateService } from '../../core/services/game-state.service';
import { GameLoopService } from '../../core/services/game-loop.service';

@Injectable({ providedIn: 'root' })
export class ImpactService {
  constructor(private ticketService: TicketService, private gameStateService: GameStateService) {}

  applyPpsDamage(): void {
    const totalPps = this.gameStateService.impactState().pps;
    const firstTicket = this.gameStateService.ticketState().active[0];

    this.ticketService.applyProgress(totalPps, firstTicket.id);
  }
}
