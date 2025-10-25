import { Component } from '@angular/core';
import { ResourcesService } from '../../../../resources/resources.service';
import { TicketService } from '../../services/ticket.service';
import { ImpactService } from '../../../../impact/impact.service';
import { NumberFormat } from '../../../../../core/pipes/number-format.pipe';

@Component({
  selector: 'app-ticket',
  imports: [NumberFormat],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  constructor(
    private resourceService: ResourcesService,
    private ticketService: TicketService,
    private impactService: ImpactService
  ) {}

  get ticket() {
    return this.ticketService.ticket();
  }

  onClick(): void {
    this.ticketService.applyProgress(this.impactService.mpi());
    this.resourceService.increaseExp(1);
  }
}
