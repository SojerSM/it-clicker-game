import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Ticket } from '../types/ticket.model';
import { TicketType } from '../types/ticket-type.enum';
import { ResourcesService } from '../../../resources/resources.service';
import { BALANCE } from '../../../../core/config/balance/balance';
import { ProjectService } from '../../projects/services/project.service';
import { TicketNameGeneratorService } from './ticket-name-generator.service';

@Injectable({ providedIn: 'root' })
export class TicketService {
  readonly ticket: WritableSignal<Ticket>;

  constructor(
    private resourceService: ResourcesService,
    private projectService: ProjectService,
    private ticketNameGeneratorService: TicketNameGeneratorService
  ) {
    this.ticket = signal(this.getRandomTicket());

    effect(() => {
      if (this.ticket().remainingCp <= 0) {
        this.completeTicket();
      }
    });
  }

  applyProgress(value: number): void {
    this.ticket.update((current) => {
      return { ...current, remainingCp: current.remainingCp - value };
    });
  }

  private completeTicket(): void {
    this.resourceService.increaseMoney(this.ticket().rewardMoney);
    this.projectService.applyProgress(this.ticket().totalCp);
    this.ticket.set(this.getRandomTicket());
  }

  private getRandomTicket(): Ticket {
    const types: string[] = Object.keys(TicketType);
    const randomType = types[Math.floor(Math.random() * types.length)] as TicketType;

    let totalCp = BALANCE.TICKET_CP;

    const rewardMoney = Math.floor(totalCp / 2);
    const description = this.ticketNameGeneratorService.generateName(randomType);

    return {
      alias: 'test-1',
      description,
      type: randomType,
      totalCp,
      remainingCp: totalCp,
      isCompleted: false,
      rewardMoney,
    };
  }
}
