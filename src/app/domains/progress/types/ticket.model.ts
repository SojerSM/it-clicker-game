import { TicketType } from './ticket-type.enum';

export interface Ticket {
  type: TicketType;
  totalCp: number;
  remainingCp: number;
  isCompleted: boolean;
  rewardMoney: number;
}
