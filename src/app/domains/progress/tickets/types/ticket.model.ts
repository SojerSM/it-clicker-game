import { TicketType } from './ticket-type.enum';

export interface Ticket {
  id: number;
  alias: string;
  description: string;
  type: TicketType;
  totalCp: number;
  remainingCp: number;
  isCompleted: boolean;
}
