import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Ticket } from './types/ticket.model';
import { TicketType } from './types/ticket-type.enum';
import { ResourcesService } from '../resources/resources.service';
import { Sprint } from './types/sprint.model';
import { MULTIPLIERS } from '../../core/config/balance/multipliers';
import { BALANCE } from '../../core/config/balance/balance';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  readonly sprint = signal<Sprint>(this.getFirstSprint());
  readonly ticket = signal<Ticket>(this.getRandomTicket());

  constructor(private resource: ResourcesService) {
    effect(() => {
      if (this.ticket().remainingCp <= 0) {
        this.completeTicket();
      }

      if (this.sprint().requiredTickets === this.sprint().finished) {
        this.levelUp();
      }
    });
  }

  applyProgress(value: number): void {
    this.ticket.update((current) => {
      return { ...current, remainingCp: current.remainingCp - value };
    });
  }

  private completeTicket(): void {
    this.resource.increaseMoney(this.ticket().rewardMoney);
    this.sprint.update((current) => {
      return { ...current, finished: current.finished + 1 };
    });
    this.ticket.set(this.getRandomTicket());
  }

  private getRandomTicket(): Ticket {
    const types: string[] = Object.keys(TicketType);
    const randomType = types[Math.floor(Math.random() * types.length)] as TicketType;

    let totalCp: number;

    if (this.sprint().current === 1) {
      totalCp = BALANCE.TICKET_CP;
    } else {
      totalCp = BALANCE.TICKET_CP * Math.pow(MULTIPLIERS.TICKET_CP, this.sprint().current);
    }

    const rewardMoney = Math.floor(totalCp / 2);

    return {
      type: randomType,
      totalCp,
      remainingCp: totalCp,
      isCompleted: false,
      rewardMoney,
    };
  }

  private getFirstSprint(): Sprint {
    return {
      current: 1,
      requiredTickets: BALANCE.SPRINT_SIZE,
      finished: 0,
    };
  }

  private getRandomSprintSize(previous: number): number {
    const variation = 0.07;
    const randomFactor = 1 + (Math.random() * 2 - 1) * variation;
    return Math.round(previous * MULTIPLIERS.SPRINT_SIZE * randomFactor);
  }

  private levelUp(): void {
    const newRequired = this.getRandomSprintSize(this.sprint().requiredTickets);

    const newSprint: Sprint = {
      current: this.sprint().current + 1,
      requiredTickets: newRequired,
      finished: 0,
    };

    this.sprint.set(newSprint);
    this.ticket.set(this.getRandomTicket());
  }
}
