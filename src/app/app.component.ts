import { Component } from '@angular/core';
import { TicketComponent } from './domains/progress/components/ticket/ticket.component';
import { ProgressBarComponent } from './domains/progress/components/progress-bar/progress-bar.component';
import { ImpactSummaryComponent } from './domains/impact/components/impact-summary/impact-summary.component';
import { HeaderResourcesCounterComponent } from './domains/resources/components/header-resources-counter/header-resources-counter.component';

@Component({
  selector: 'app-root',
  imports: [
    TicketComponent,
    ProgressBarComponent,
    ImpactSummaryComponent,
    HeaderResourcesCounterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
