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
    this.gameStateService.updateProject((state) => {
      if (state.current) {
        const updatedRemainingCp = state.current.remainingCp - value;
        state.current = {
          ...state.current,
          remainingCp: updatedRemainingCp,
        };
      }
    });
  }

  setFirstProject(): void {
    const newProject = this.projectGenerator.generateProject();
    this.gameStateService.updateProject((state) => {
      state.current = newProject;
    });
  }
}
