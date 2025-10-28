import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.model';
import { ProgressBarComponent } from '../../../../../shared/components/progress-bar/progress-bar/progress-bar.component';

@Component({
  selector: 'app-project-progress',
  imports: [ProgressBarComponent],
  templateUrl: './project-progress.component.html',
  styleUrl: './project-progress.component.scss',
})
export class ProjectProgressComponent {
  constructor(private projectService: ProjectService) {}

  get project(): Project {
    return this.projectService.project();
  }
}
