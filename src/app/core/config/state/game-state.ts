import { Project } from '../../../domains/progress/projects/types/project.model';
import { Ticket } from '../../../domains/progress/tickets/types/ticket.model';
import { GameState } from './game-state.model';

export const INITIAL_GAME_STATE: GameState = {
  impact: {
    mpi: 1,
    pps: 0,
  },
  resource: {
    money: 0,
    exp: 0,
  },
  project: {
    current: {} as Project,
    finished: 0,
  },
  tickets: {
    current: [] as Ticket[],
    finished: 0,
  },
};
