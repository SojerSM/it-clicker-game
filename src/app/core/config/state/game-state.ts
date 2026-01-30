import { Project } from '../../../domains/progress/projects/types/project.model';
import { Ticket } from '../../../domains/progress/tickets/types/ticket.model';
import { GameState } from './game-state.model';

export const INITIAL_GAME_STATE: GameState = {
  impact: {
    organicMpi: 1,
    totalMpi: 1,
    totalPps: 0,
  },
  effects: {
    active: [],
  },
  heroes: {
    owned: [],
    occupiedAvatars: [],
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
    currentBaseCp: 20,
    typeMultipliers: {
      feature: { cp: 1, reward: 1.25 },
      maintenance: { cp: 1.5, reward: 1 },
      bugfix: { cp: 0.8, reward: 0.5 },
      hotfix: { cp: 1.2, reward: 0.75 },
      testing: { cp: 2, reward: 0.5 },
      documentation: { cp: 0.5, reward: 0.25 },
      refactoring: { cp: 2.5, reward: 0.5 },
    },
  },
  recruitment: {
    effectiveness: 0,
    completedProcesses: 0,
  },
};
