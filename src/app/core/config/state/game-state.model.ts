import {
  EffectState,
  ImpactState,
  HeroState,
  ProjectState,
  ResourceState,
  TicketState,
  RecruitmentState,
  StatisticState,
  CompanyState,
} from '../../types/state.model';

export interface GameState {
  impact: ImpactState;
  effects: EffectState;
  heroes: HeroState;
  company: CompanyState;
  resource: ResourceState;
  project: ProjectState;
  tickets: TicketState;
  recruitment: RecruitmentState;
  statistics: StatisticState;
}
