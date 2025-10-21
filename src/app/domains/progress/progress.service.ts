import { Injectable, signal, WritableSignal } from '@angular/core';
import { Ticket } from './types/ticket.model';
import { TicketType } from './types/ticket-type.enum';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  readonly ticket = signal<Ticket>(this.getRandomTicket());

  applyProgress(value: number) {
    this.ticket.update((current) => {
      const remaining = current.remainingCp - value;

      if (remaining <= 0) {
        return this.getRandomTicket();
      }

      return { ...current, remainingCp: remaining };
    });
  }

  private getRandomTicket(): Ticket {
    const types: string[] = Object.keys(TicketType);

    const totalCp = 20;
    const rewardMoney = 50;

    const randomType = types[Math.floor(Math.random() * types.length)] as TicketType;

    return {
      id: '1',
      type: randomType,
      totalCp,
      remainingCp: totalCp,
      isCompleted: false,
      rewardMoney,
    };
  }
}
