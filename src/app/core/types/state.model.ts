import { Effect } from '../../domains/effect/types/effect.model';
import { Hero } from '../../domains/heroes/types/hero.model';
import { Project } from '../../domains/progress/projects/types/project.model';
import { Ticket } from '../../domains/progress/tickets/types/ticket.model';

export interface ImpactState {
  organicMpi: number;
  totalMpi: number;
  totalPps: number;
}

export interface EffectState {
  active: Effect[];
}

export interface HeroState {
  owned: Hero[];
  occupiedAvatars: string[];
}

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
  currentBaseCp: number;
  typeMultipliers: TicketTypeMultipliers;
}

export interface TicketTypeMultiplier {
  cp: number;
  reward: number;
}

export interface RecruitmentState {
  effectiveness: number;
  completedProcesses: number;
}

export type TicketTypeMultipliers = Record<string, TicketTypeMultiplier>;
