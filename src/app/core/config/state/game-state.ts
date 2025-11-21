import { Project } from '../../../domains/progress/projects/types/project.model';
import { Ticket } from '../../../domains/progress/tickets/types/ticket.model';
import { GameState } from './game-state.model';

export const INITIAL_GAME_STATE: GameState = {
  impact: {
    organicMpi: 100,
    totalMpi: 100,
    totalPps: 0,
  },
  effects: {
    active: [],
  },
  heroes: {
    owned: [],
  },
  resource: {
    money: 0,
  },
  project: {
    current: {} as Project,
    finished: 0,
  },
  tickets: {
    active: [] as Ticket[],
    finished: 0,
  },
};
