import { Company } from '../../../domains/company/types/company.model';
import { Project } from '../../../domains/progress/projects/types/project.model';
import { Ticket } from '../../../domains/progress/tickets/types/ticket.model';
import { StatisticState } from '../../types/state.model';
import { GameState } from './game-state.model';

const STATISTIC_STATE: StatisticState = {
  heroes: {
    recruited: 0,
  },
  impact: {
    clicks: 0,
  },
  money: {
    earned: 0,
    spent: 0,
  },
  playtime: {
    total: 0,
  },
  tickets: {
    finished: 0,
  },
};

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
    slots: 0,
  },
  company: {
    company: {} as Company,
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
  statistics: STATISTIC_STATE,
};
