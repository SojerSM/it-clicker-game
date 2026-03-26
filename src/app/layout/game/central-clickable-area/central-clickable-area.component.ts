import { Component } from '@angular/core';
import { TicketListComponent } from '../../../domains/progress/tickets/components/ticket-list/ticket-list.component';
import { MessagesAppPanelComponent } from '../../../domains/progress/messages/components/messagess-app-panel/messages-app-panel.component';

@Component({
  selector: 'app-central-clickable-area',
  imports: [TicketListComponent, MessagesAppPanelComponent],
  templateUrl: './central-clickable-area.component.html',
  styleUrl: './central-clickable-area.component.scss',
})
export class CentralClickableAreaComponent {}
