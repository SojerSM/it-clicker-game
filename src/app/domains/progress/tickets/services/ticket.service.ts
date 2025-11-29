import { effect, Injectable } from '@angular/core';
import { Ticket } from '../types/ticket.model';
import { ResourcesService } from '../../../resources/resources.service';
import { ProjectService } from '../../projects/services/project.service';
import { GameStateService } from '../../../../core/services/game-state.service';
import { TicketBuilderService } from './ticket-builder.service';

@Injectable({ providedIn: 'root' })
export class TicketService {
  constructor(
    private resourceService: ResourcesService,
    private projectService: ProjectService,
    private gameStateService: GameStateService,
    private ticketBuilderService: TicketBuilderService
  ) {
    effect(() => {
      this.gameStateService.ticketState().active.forEach((ticket) => {
        if (ticket.remainingCp <= 0) {
          this.completeTicket(ticket);
        }
      });
    });
  }

  addTicket(ticket: Ticket) {
    this.gameStateService.updateTicket((state) => {
      state.finished += 1;
      state.active.push(ticket);
    });
  }

  applyProgress(value: number, ticketId: number): void {
    this.gameStateService.updateTicket((state) => {
      state.active = state.active.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, remainingCp: Math.max(ticket.remainingCp - value, 0) }
          : ticket
      );
    });
  }

  private completeTicket(ticket: Ticket): void {
    this.grantReward(ticket);
    this.gameStateService.updateTicket((state) => {
      state.active = state.active.filter((t) => t.id !== ticket.id);
    });

    if (this.gameStateService.ticketState().active.length === 0) {
      const project = this.gameStateService.projectState().current;
      const newTicket = this.ticketBuilderService.getRandomTicket(project);

      this.addTicket(newTicket);
    }
  }

  private grantReward(ticket: Ticket): void {
    const projectMoneyRewardRatio = this.gameStateService.projectState().current.moneyRewardRatio;

    this.resourceService.increaseMoney(ticket.totalCp * projectMoneyRewardRatio);
    this.projectService.applyProgress(ticket.totalCp);
  }
}
