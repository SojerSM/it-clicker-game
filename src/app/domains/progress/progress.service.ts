import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Ticket } from './types/ticket.model';
import { TicketType } from './types/ticket-type.enum';
import { ResourcesService } from '../resources/resources.service';
import { Sprint } from './types/sprint.model';
import { BASE_VALUES } from '../../core/config/base-values.config';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  readonly ticket = signal<Ticket>(this.getRandomTicket());
  readonly sprint = signal<Sprint>(this.getFirstSprint());

  constructor(private resource: ResourcesService) {
    effect(() => {
      const currentTicket = this.ticket();
      const currentSprint = this.sprint();

      if (currentTicket.remainingCp <= 0) {
        this.completeTicket();
      }

      if (currentSprint.requiredTickets === currentSprint.finished) {
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

    const totalCp = 20;
    const rewardMoney = 50;

    const randomType = types[Math.floor(Math.random() * types.length)] as TicketType;

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
      current: BASE_VALUES.progress.sprint,
      requiredTickets: BASE_VALUES.progress.sprintRequiredTickets,
      finished: 0,
    };
  }

  private getRandomSprintSize(previous: number): number {
    const variation = 0.07;
    const randomFactor = 1 + (Math.random() * 2 - 1) * variation;
    return Math.round(previous * 1.12 * randomFactor);
  }

  private levelUp(): void {
    const newRequired = this.getRandomSprintSize(this.sprint().requiredTickets);

    this.sprint.update(() => {
      return {
        current: this.sprint().current + 1,
        requiredTickets: newRequired,
        finished: 0,
      };
    });
  }
}
