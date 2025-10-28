import { Injectable } from '@angular/core';
import { TicketNameGeneratorService } from './ticket-name-generator.service';
import { TicketType } from '../types/ticket-type.enum';
import { BALANCE } from '../../../../core/config/balance/balance';
import { Project } from '../../projects/types/project.model';
import { Ticket } from '../types/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketBuilderService {
  constructor(private ticketNameGeneratorService: TicketNameGeneratorService) {}

  getRandomTicket(project: Project, previousId?: number): Ticket {
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
