import { Component, Signal } from '@angular/core';
import { TicketComponent } from '../ticket/ticket.component';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../types/ticket.model';

@Component({
  selector: 'app-ticket-list',
  imports: [TicketComponent],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss',
})
export class TicketListComponent {
  constructor(private ticketService: TicketService) {}

  get tickets(): Signal<Ticket[]> {
    return this.ticketService.tickets;
  }
}
