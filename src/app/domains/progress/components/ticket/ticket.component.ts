import { Component } from '@angular/core';
import { ResourcesService } from '../../../resources/resources.service';
import { ProgressService } from '../../progress.service';

@Component({
  selector: 'app-ticket',
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  constructor(private resource: ResourcesService, private progress: ProgressService) {}

  get ticket() {
    return this.progress.ticket();
  }

  onClick(): void {
    this.resource.increaseExp(1);
  }
}
