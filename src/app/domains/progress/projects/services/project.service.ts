import { Injectable, signal, WritableSignal } from '@angular/core';
import { Project } from '../types/project.model';
import { ProjectGeneratorService } from './project-generator.service';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  readonly project: WritableSignal<Project>;

  constructor(private projectGenerator: ProjectGeneratorService) {
    this.project = signal(this.projectGenerator.generateProject());
  }

  applyProgress(value: number): void {
    const updatedRemainingCp = this.project().remainingCp - value;
    this.project.update((current) => ({
      ...current,
      remainingCp: updatedRemainingCp,
    }));
  }
}
