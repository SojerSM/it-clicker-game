import { Component, Input } from '@angular/core';
import { ResourcesService } from '../../../../resources/resources.service';
import { TicketService } from '../../services/ticket.service';
import { NumberFormat } from '../../../../../core/pipes/number-format.pipe';
import { Ticket } from '../../types/ticket.model';
import { TicketType } from '../../types/ticket-type.enum';
import { ProgressBarComponent } from '../../../../../shared/components/progress-bar/progress-bar/progress-bar.component';
import { GameStateService } from '../../../../../core/services/game-state.service';
import { PlayerService } from '../../../../player/services/player.service';

@Component({
  selector: 'app-ticket',
  imports: [NumberFormat, ProgressBarComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  @Input({ required: true }) ticket!: Ticket;

  constructor(
    private ticketService: TicketService,
    private gameStateService: GameStateService,
    private playerService: PlayerService
  ) {}

  get tagColor(): string {
    switch (this.ticket.type) {
      case TicketType.FEATURE:
        return '#4CAF50';
      case TicketType.MAINTENANCE:
        return '#2196F3';
      case TicketType.BUGFIX:
        return '#FFC107';
      case TicketType.HOTFIX:
        return '#9C27B0';
      case TicketType.TESTING:
        return '#FF9800';
      case TicketType.DOCUMENTATION:
        return '#607D8B';
      case TicketType.REFACTORING:
        return '#00BCD4';
    }
  }

  onClick(): void {
    this.ticketService.applyProgress(this.gameStateService.impactState().mpi, this.ticket.id);
    this.playerService.increaseExp(1);
  }
}
