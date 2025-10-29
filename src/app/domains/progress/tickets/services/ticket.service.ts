import { computed, effect, Injectable, Signal } from '@angular/core';
import { Ticket } from '../types/ticket.model';
import { ResourcesService } from '../../../resources/resources.service';
import { ProjectService } from '../../projects/services/project.service';
import { TicketBuilderService } from './ticket-builder.service';
import { GameStateService } from '../../../../core/services/game-state.service';

@Injectable({ providedIn: 'root' })
export class TicketService {
  readonly tickets: Signal<Ticket[]>;

  constructor(
    private resourceService: ResourcesService,
    private projectService: ProjectService,
    private ticketBuilder: TicketBuilderService,
    private gameStateService: GameStateService
  ) {
    this.tickets = computed(() => this.gameStateService.tickets()());

    effect(() => {
      const project = this.gameStateService.project()();

      if (!project?.description) return;

      if (this.tickets().length === 0) {
        const newTicket = this.ticketBuilder.getRandomTicket(project);
        this.addTicket(newTicket);
      }

      this.tickets().forEach((ticket) => {
        if (ticket.remainingCp <= 0) {
          this.completeTicket(ticket);
          this.addTicket(this.ticketBuilder.getRandomTicket(project, ticket.id));
        }
      });
    });
  }

  private addTicket(ticket: Ticket) {
    this.gameStateService.updateState((state) => {
      state.tickets.current.push(ticket);
    });
  }

  applyProgress(value: number, ticketId: number): void {
    this.gameStateService.updateState((state) => {
      state.tickets.current = state.tickets.current.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, remainingCp: Math.max(ticket.remainingCp - value, 0) }
          : ticket
      );
    });
  }

  private completeTicket(ticket: Ticket): void {
    this.grantReward(ticket);
    this.gameStateService.updateState((state) => {
      state.tickets.current = state.tickets.current.filter((t) => t.id !== ticket.id);
    });
  }

  private grantReward(ticket: Ticket): void {
    this.resourceService.increaseMoney(ticket.rewardMoney);
    this.projectService.applyProgress(ticket.totalCp);
  }
}
