import { Component } from '@angular/core';
import { NumberFormat } from '../../../../../core/pipes/number-format.pipe';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.model';

@Component({
  selector: 'app-project-progress',
  imports: [NumberFormat],
  templateUrl: './project-progress.component.html',
  styleUrl: './project-progress.component.scss',
})
export class ProjectProgressComponent {
  constructor(private projectService: ProjectService) {}

  get project(): Project {
    return this.projectService.project();
  }

  get percentage(): number {
    const totalCp = this.projectService.project().totalCp;
    const remainingCp = this.projectService.project().remainingCp;

    return Math.ceil((remainingCp / totalCp) * 100);
  }
}
