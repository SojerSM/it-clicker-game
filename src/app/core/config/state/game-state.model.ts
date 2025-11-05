import {
  ImpactState,
  PlayerState,
  ProjectState,
  ResourceState,
  TicketState,
} from '../../types/state.model';

export interface GameState {
  impact: ImpactState;
  player: PlayerState;
  resource: ResourceState;
  project: ProjectState;
  tickets: TicketState;
}
