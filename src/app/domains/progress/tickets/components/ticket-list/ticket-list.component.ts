import { Component } from '@angular/core';
import { TicketComponent } from '../ticket/ticket.component';
import { Ticket } from '../../types/ticket.model';
import { GameStateService } from '../../../../../core/services/game-state.service';

@Component({
  selector: 'app-ticket-list',
  imports: [TicketComponent],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss',
})
export class TicketListComponent {
  constructor(private gameStateService: GameStateService) {}

  get tickets(): Ticket[] {
    return this.gameStateService.ticketState().active;
  }
}
