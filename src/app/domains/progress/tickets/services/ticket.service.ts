import { effect, Injectable, signal, untracked, WritableSignal } from '@angular/core';
import { Ticket } from '../types/ticket.model';
import { TicketType } from '../types/ticket-type.enum';
import { ResourcesService } from '../../../resources/resources.service';
import { BALANCE } from '../../../../core/config/balance/balance';
import { ProjectService } from '../../projects/services/project.service';
import { TicketNameGeneratorService } from './ticket-name-generator.service';
import { Project } from '../../projects/types/project.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  readonly tickets: WritableSignal<Ticket[]>;

  constructor(
    private resourceService: ResourcesService,
    private projectService: ProjectService,
    private ticketNameGeneratorService: TicketNameGeneratorService
  ) {
    this.tickets = signal([]);

    effect(() => {
      const project = this.projectService.project();

      if (project) {
        if (this.tickets().length === 0) {
          const newTicket = this.getRandomTicket(project);
          this.tickets.update((current) => [...current, newTicket]);
        }

        for (let ticket of this.tickets()) {
          if (ticket.remainingCp <= 0) {
            this.completeTicket(ticket);
            this.tickets.update((current) => [
              ...current,
              this.getRandomTicket(project, ticket.id),
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

  private getRandomTicket(project: Project, previousId?: number): Ticket {
    let totalCp = BALANCE.TICKET_CP;
    const id = previousId ? previousId + 1 : 1;

    const types: string[] = Object.keys(TicketType);
    const randomType = types[Math.floor(Math.random() * types.length)] as TicketType;
    const rewardMoney = Math.floor(totalCp / 2);
    const description = this.ticketNameGeneratorService.generateName(randomType);
    const alias = `${this.generateAlias(project.description)}-${id}`;

    return {
      id,
      alias,
      description,
      type: randomType,
      totalCp,
      remainingCp: totalCp,
      isCompleted: false,
      rewardMoney,
    };
  }

  private generateAlias(name: string): string {
    const words = name.split(' ').filter((w) => w.length >= 3);

    const alias = words
      .slice(0, 3)
      .map((w) => w[0].toUpperCase())
      .join('');

    return alias;
  }
}
