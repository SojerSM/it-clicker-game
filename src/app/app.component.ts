import { Component } from '@angular/core';
import { TicketComponent } from './domains/progress/tickets/components/ticket/ticket.component';
import { ImpactSummaryComponent } from './domains/impact/components/impact-summary/impact-summary.component';
import { HeaderResourcesCounterComponent } from './domains/resources/components/header-resources-counter/header-resources-counter.component';
import { ProjectProgressComponent } from './domains/progress/projects/components/progress-header/project-progress.component';

@Component({
  selector: 'app-root',
  imports: [
    TicketComponent,
    ImpactSummaryComponent,
    HeaderResourcesCounterComponent,
    ProjectProgressComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
