import { Component } from '@angular/core';
import { ResourcesService } from '../../../../resources/resources.service';
import { TicketService } from '../../services/ticket.service';
import { ImpactService } from '../../../../impact/impact.service';
import { NumberFormat } from '../../../../../core/pipes/number-format.pipe';
import { Ticket } from '../../types/ticket.model';
import { TicketType } from '../../types/ticket-type.enum';

@Component({
  selector: 'app-ticket',
  imports: [NumberFormat],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  constructor(
    private resourceService: ResourcesService,
    private ticketService: TicketService,
    private impactService: ImpactService
  ) {}

  get ticket(): Ticket {
    return this.ticketService.ticket();
  }

  get tagColor(): string {
    const ticket = this.ticketService.ticket();

    switch (ticket.type) {
      case TicketType.FEATURE:
        return '#4CAF50';
      case TicketType.MAINTENANCE:
        return '#2196F3';
      case TicketType.BUGFIX:
        return '#FFC107';
      case TicketType.HOTFIX:
        return '#9C27B0';
      case TicketType.TESTING:
        return '#FF9800';
      case TicketType.DOCUMENTATION:
        return '#607D8B';
      case TicketType.REFACTORING:
        return '#00BCD4';
    }
  }

  onClick(): void {
    this.ticketService.applyProgress(this.impactService.mpi());
    this.resourceService.increaseExp(1);
  }
}
