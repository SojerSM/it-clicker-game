import { Project } from '../../../domains/progress/projects/types/project.model';
import { Ticket } from '../../../domains/progress/tickets/types/ticket.model';

export interface GameState {
  impact: {
    mpi: number;
    pps: number;
  };
  resource: {
    money: number;
    exp: number;
  };
  project: {
    current: Project;
    finished: number;
  };
  tickets: {
    current: Ticket[];
    finished: number;
  };
}
