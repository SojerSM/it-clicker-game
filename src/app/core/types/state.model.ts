import { Player } from '../../domains/player/types/player.model';
import { Project } from '../../domains/progress/projects/types/project.model';
import { Ticket } from '../../domains/progress/tickets/types/ticket.model';

export interface ImpactState {
  mpi: number;
  pps: number;
}

export interface PlayerState extends Player {}

export interface ResourceState {
  money: number;
}

export interface ProjectState {
  current: Project;
  finished: number;
}

export interface TicketState {
  active: Ticket[];
  finished: number;
}
