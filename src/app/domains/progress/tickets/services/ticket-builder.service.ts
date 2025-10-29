import { Injectable } from '@angular/core';
import { TicketNameGeneratorService } from './ticket-name-generator.service';
import { TicketType } from '../types/ticket-type.enum';
import { Project } from '../../projects/types/project.model';
import { Ticket } from '../types/ticket.model';
import { BALANCE } from '../../../../core/config/state/balance';

@Injectable({ providedIn: 'root' })
export class TicketBuilderService {
  constructor(private ticketNameGeneratorService: TicketNameGeneratorService) {}

  getRandomTicket(project: Project, previousId?: number): Ticket {
    let totalCp = BALANCE.TICKET_INITIAL_CP;
    const id = previousId ? previousId + 1 : 1;
    const randomType = this.getRandomTicketType(id);
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
    const words = name.split(' ').filter((word) => word.length >= 3);
    const alias = words
      .slice(0, 3)
      .map((word) => word[0].toUpperCase())
      .join('');

    return alias;
  }

  private getRandomTicketType(ticketId: number) {
    const LIMIT_ID = 100;

    const earlyTypes: TicketType[] = [TicketType.FEATURE, TicketType.DOCUMENTATION];

    const lateTypes: TicketType[] = [
      TicketType.BUGFIX,
      TicketType.HOTFIX,
      TicketType.MAINTENANCE,
      TicketType.REFACTORING,
      TicketType.TESTING,
    ];

    const lateWeight = Math.min(ticketId / LIMIT_ID, 1);

    const random = Math.random();
    let randomType: TicketType;

    if (random < lateWeight) {
      const allTypes = [...earlyTypes, ...lateTypes];
      randomType = allTypes[Math.floor(Math.random() * allTypes.length)];
    } else {
      randomType = earlyTypes[Math.floor(Math.random() * earlyTypes.length)];
    }

    return randomType;
  }
}
