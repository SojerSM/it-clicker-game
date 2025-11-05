import {
  EffectState,
  ImpactState,
  PlayerState,
  ProjectState,
  ResourceState,
  TicketState,
} from '../../types/state.model';

export interface GameState {
  impact: ImpactState;
  effects: EffectState;
  player: PlayerState;
  resource: ResourceState;
  project: ProjectState;
  tickets: TicketState;
}
