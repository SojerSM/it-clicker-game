import { Component } from '@angular/core';
import { TicketComponent } from '../ticket/ticket.component';
import { Ticket } from '../../types/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  imports: [TicketComponent],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss',
})
export class TicketListComponent {
  constructor(private ticketService: TicketService) {}

  get tickets(): Ticket[] {
    return this.ticketService.tickets();
  }
}
