import { Component, OnInit } from '@angular/core';
import { ImpactSummaryComponent } from './domains/impact/components/impact-summary/impact-summary.component';
import { HeaderResourcesCounterComponent } from './domains/resources/components/header-resources-counter/header-resources-counter.component';
import { ProjectProgressComponent } from './domains/progress/projects/components/progress-header/project-progress.component';
import { TicketListComponent } from './domains/progress/tickets/components/ticket-list/ticket-list.component';
import { ProjectService } from './domains/progress/projects/services/project.service';
import { GameSaveService } from './core/services/game-save.service';
import { GameStateService } from './core/services/game-state.service';

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
  constructor(
    private projectService: ProjectService,
    private gameSaveService: GameSaveService,
    private gameStateService: GameStateService
  ) {}

  ngOnInit(): void {
    this.projectService.setFirstProject();
    this.manageState();
  }

  ngOnDestroy(): void {
    this.gameSaveService.stopAutoSave();
  }

  private manageState(): void {
    const loadedState = this.gameSaveService.load();

    if (loadedState) {
      this.gameStateService.setState(loadedState);
    }

    this.gameSaveService.startAutoSave();
  }
}
