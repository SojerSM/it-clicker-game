import { Component } from '@angular/core';
import { ResourcesService } from '../../../resources/resources.service';

@Component({
  selector: 'app-ticket',
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  constructor(private resourceService: ResourcesService) {}

  onClick(): void {
    this.resourceService.increaseExp(1);
  }
}
