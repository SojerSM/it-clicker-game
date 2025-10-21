import { Component } from '@angular/core';
import { ResourcesService } from '../../../resources/resources.service';
import { ProgressService } from '../../progress.service';
import { ImpactService } from '../../../impact/impact.service';

@Component({
  selector: 'app-ticket',
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  constructor(
    private resource: ResourcesService,
    private progress: ProgressService,
    private impact: ImpactService
  ) {}

  get ticket() {
    return this.progress.ticket();
  }

  get sprint() {
    return this.progress.sprint();
  }

  onClick(): void {
    this.progress.applyProgress(this.impact.mpi());
    this.resource.increaseExp(1);
  }
}
