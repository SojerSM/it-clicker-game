import { Component, OnInit } from '@angular/core';
import { ImpactSummaryComponent } from './domains/impact/components/impact-summary/impact-summary.component';
import { HeaderResourcesCounterComponent } from './domains/resources/components/header-resources-counter/header-resources-counter.component';
import { ProjectProgressComponent } from './domains/progress/projects/components/progress-header/project-progress.component';
import { TicketListComponent } from './domains/progress/tickets/components/ticket-list/ticket-list.component';
import { ProjectService } from './domains/progress/projects/services/project.service';

@Component({
  selector: 'app-root',
  imports: [
    ImpactSummaryComponent,
    HeaderResourcesCounterComponent,
    ProjectProgressComponent,
    TicketListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.setFirstProject();
  }
}
