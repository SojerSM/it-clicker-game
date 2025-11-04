import { computed, effect, Injectable, NgZone, OnInit, Signal } from '@angular/core';
import { TicketService } from './ticket.service';
import { interval, Subscription } from 'rxjs';
import { TicketBuilderService } from './ticket-builder.service';
import { GameStateService } from '../../../../core/services/game-state.service';

@Injectable({ providedIn: 'root' })
export class TicketQueueService {
  readonly tickets = computed(() => this.gameStateService.ticketState().active);

  private readonly BASE_INTERVAL_MS = 30_000;
  private ticketSpawnJob?: Subscription;

  constructor(
    private ticketService: TicketService,
    private ticketBuilderService: TicketBuilderService,
    private gameStateService: GameStateService,
    private zone: NgZone
  ) {}

  /**
   * Manual init in game loop
   */
  start(): void {
    this.provideFirstTicketIfNeeded();
    this.restartTicketSpawner();
  }

  stop(): void {
    this.stopTicketSpawner();
  }

  private provideFirstTicketIfNeeded(): void {
    if (this.gameStateService.ticketState().finished > 0) return;

    const project = this.gameStateService.projectState().current;

    if (!project?.description) return;

    if (this.tickets().length === 0) {
      const newTicket = this.ticketBuilderService.getRandomTicket(project);
      this.ticketService.addTicket(newTicket);
    }
  }

  private restartTicketSpawner(): void {
    this.stopTicketSpawner();

    const currentProject = this.gameStateService.projectState().current;

    this.zone.runOutsideAngular(() => {
      this.ticketSpawnJob = interval(this.BASE_INTERVAL_MS).subscribe(() => {
        const newTicket = this.ticketBuilderService.getRandomTicket(currentProject);
        this.ticketService.addTicket(newTicket);
      });
    });
  }

  private stopTicketSpawner(): void {
    if (this.ticketSpawnJob) {
      this.ticketSpawnJob.unsubscribe();
      this.ticketSpawnJob = undefined;
    }
  }
}
