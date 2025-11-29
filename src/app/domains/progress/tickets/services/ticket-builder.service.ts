import { computed, Injectable } from '@angular/core';
import { TicketNameGeneratorService } from './ticket-name-generator.service';
import { TicketType } from '../types/ticket-type.enum';
import { Project } from '../../projects/types/project.model';
import { Ticket } from '../types/ticket.model';
import { BALANCE } from '../../../../core/config/state/balance';
import { GameStateService } from '../../../../core/services/game-state.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class TicketBuilderService {
  private readonly finishedTickets = computed(() => this.gameStateService.ticketState().finished);

  constructor(
    private ticketNameGeneratorService: TicketNameGeneratorService,
    private gameStateService: GameStateService,
    private translateService: TranslateService
  ) {}

  getRandomTicket(project: Project): Ticket {
    let totalCp = BALANCE.TICKET_INITIAL_CP;
    const id = this.finishedTickets() + 1;
    const randomType = this.getRandomTicketType();
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
    };
  }

  private generateAlias(name: string): string {
    const translated: string = this.translateService.instant(name);

    const words = translated.split(' ').filter((word) => word.length >= 3);
    const alias = words
      .slice(0, 3)
      .map((word) => word[0].toUpperCase())
      .join('');

    return alias;
  }

  private getRandomTicketType() {
    const LIMIT = 100;
    const earlyTypes: TicketType[] = [TicketType.FEATURE, TicketType.DOCUMENTATION];
    const lateTypes: TicketType[] = [
      TicketType.BUGFIX,
      TicketType.HOTFIX,
      TicketType.MAINTENANCE,
      TicketType.REFACTORING,
      TicketType.TESTING,
    ];
    const lateWeight = Math.min(this.finishedTickets() / LIMIT, 1);
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
