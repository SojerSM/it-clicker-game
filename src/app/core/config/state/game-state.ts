import { HeroRole } from '../../../domains/heroes/types/enums/hero-role.enum';
import { HeroType } from '../../../domains/heroes/types/enums/hero-type.enum';
import { Project } from '../../../domains/progress/projects/types/project.model';
import { Ticket } from '../../../domains/progress/tickets/types/ticket.model';
import { GameState } from './game-state.model';

export const INITIAL_GAME_STATE: GameState = {
  impact: {
    mpi: 1,
    pps: 0,
  },
  effects: {
    active: [],
  },
  heroes: {
    owned: [
      {
        id: 'hero-ceo',
        type: HeroType.PLAYER,
        role: HeroRole.CEO,
        name: 'John Doe',
        avatar: 'assets/heroes/hero_male_avatar_01.png',
        lvl: 1,
        exp: 0,
        expRatio: 1,
        expToLevelUp: 100,
        baseRequiredExp: 100,
        stressFactor: 0.5,
      },
    ],
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
