import { Player } from '../../../domains/player/types/player.model';
import { Project } from '../../../domains/progress/projects/types/project.model';
import { Ticket } from '../../../domains/progress/tickets/types/ticket.model';

export interface GameState {
  impact: {
    mpi: number;
    pps: number;
  };
  player: Player;
  resource: {
    money: number;
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
