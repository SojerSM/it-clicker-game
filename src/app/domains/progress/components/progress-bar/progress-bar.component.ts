import { Component, Input } from '@angular/core';
import { ProgressService } from '../../progress.service';
import { Ticket } from '../../types/ticket.model';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  constructor(private progress: ProgressService) {}

  get percentage(): number {
    const ticket: Ticket = this.progress.ticket();
    const max = ticket.totalCp;
    const value = ticket.remainingCp;

    return Math.min((value / max) * 100, 100);
  }
}
