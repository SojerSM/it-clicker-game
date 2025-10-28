import { effect, Injectable, signal, untracked, WritableSignal } from '@angular/core';
import { Ticket } from '../types/ticket.model';
import { ResourcesService } from '../../../resources/resources.service';
import { ProjectService } from '../../projects/services/project.service';
import { TicketBuilderService } from './ticket-builder.service';

@Injectable({ providedIn: 'root' })
export class TicketService {
  readonly tickets: WritableSignal<Ticket[]>;

  constructor(
    private resourceService: ResourcesService,
    private projectService: ProjectService,
    private ticketBuilder: TicketBuilderService
  ) {
    this.tickets = signal([]);

    effect(() => {
      const project = this.projectService.project();

      if (project) {
        if (this.tickets().length === 0) {
          const newTicket = this.ticketBuilder.getRandomTicket(project);
          this.tickets.update((current) => [...current, newTicket]);
        }

        for (let ticket of this.tickets()) {
          if (ticket.remainingCp <= 0) {
            this.completeTicket(ticket);
            this.tickets.update((current) => [
              ...current,
              this.ticketBuilder.getRandomTicket(project, ticket.id),
            ]);
          }
        }
      }
    });
  }

  applyProgress(value: number, ticketId: number): void {
    this.tickets.update((tickets) =>
      tickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, remainingCp: Math.max(ticket.remainingCp - value, 0) }
          : ticket
      )
    );
  }

  private completeTicket(ticket: Ticket): void {
    this.grantReward(ticket);
    this.tickets.update((current) => current.filter((t) => t.id !== ticket.id));
  }

  private grantReward(ticket: Ticket): void {
    this.resourceService.increaseMoney(ticket.rewardMoney);
    this.projectService.applyProgress(ticket.totalCp);
  }
}
