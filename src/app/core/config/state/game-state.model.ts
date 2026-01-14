import {
  EffectState,
  ImpactState,
  HeroState,
  ProjectState,
  ResourceState,
  TicketState,
  RecruitmentState,
} from '../../types/state.model';

export interface GameState {
  impact: ImpactState;
  effects: EffectState;
  heroes: HeroState;
  resource: ResourceState;
  project: ProjectState;
  tickets: TicketState;
  recruitment: RecruitmentState;
}
