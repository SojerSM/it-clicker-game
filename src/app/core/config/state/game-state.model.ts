import {
  EffectState,
  ImpactState,
  HeroState,
  ProjectState,
  ResourceState,
  TicketState,
} from '../../types/state.model';

export interface GameState {
  impact: ImpactState;
  effects: EffectState;
  heroes: HeroState;
  resource: ResourceState;
  project: ProjectState;
  tickets: TicketState;
}
