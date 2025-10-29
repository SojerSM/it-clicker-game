import { Injectable } from '@angular/core';
import { ProjectGeneratorService } from './project-generator.service';
import { GameStateService } from '../../../../core/services/game-state.service';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(
    private projectGenerator: ProjectGeneratorService,
    private gameStateService: GameStateService
  ) {}

  applyProgress(value: number): void {
    this.gameStateService.updateState((state) => {
      if (state.project.current) {
        const updatedRemainingCp = state.project.current.remainingCp - value;
        state.project.current = {
          ...state.project.current,
          remainingCp: updatedRemainingCp,
        };
      }
    });
  }

  setFirstProject(): void {
    const newProject = this.projectGenerator.generateProject();
    this.gameStateService.updateState((state) => {
      state.project.current = newProject;
    });
  }
}
