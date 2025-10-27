import { TicketType } from './ticket-type.enum';

export interface Ticket {
  alias: string;
  description: string;
  type: TicketType;
  totalCp: number;
  remainingCp: number;
  isCompleted: boolean;
  rewardMoney: number;
}
