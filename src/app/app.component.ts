import { Component } from '@angular/core';
import { TicketComponent } from './domains/progress/components/ticket/ticket.component';
import { ProgressBarComponent } from './domains/progress/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-root',
  imports: [TicketComponent, ProgressBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
