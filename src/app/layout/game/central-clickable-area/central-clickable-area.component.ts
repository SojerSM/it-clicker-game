import { Component } from '@angular/core';
import { TicketListComponent } from '../../../domains/progress/tickets/components/ticket-list/ticket-list.component';

@Component({
  selector: 'app-central-clickable-area',
  imports: [TicketListComponent],
  templateUrl: './central-clickable-area.component.html',
  styleUrl: './central-clickable-area.component.scss',
})
export class CentralClickableAreaComponent {}
