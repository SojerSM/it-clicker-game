import { Component } from '@angular/core';
import { Project } from '../../types/project.model';
import { ProgressBarComponent } from '../../../../../shared/components/progress-bar/progress-bar/progress-bar.component';
import { GameStateService } from '../../../../../core/services/game-state.service';

@Component({
  selector: 'app-project-progress',
  imports: [ProgressBarComponent],
  templateUrl: './project-progress.component.html',
  styleUrl: './project-progress.component.scss',
})
export class ProjectProgressComponent {
  constructor(private gameStateService: GameStateService) {}

  get project(): Project {
    return this.gameStateService.project()();
  }
}
