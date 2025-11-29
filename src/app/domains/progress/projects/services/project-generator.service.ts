import { Injectable } from '@angular/core';
import { BALANCE } from '../../../../core/config/state/balance';
import { Project } from '../types/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectGeneratorService {
  generateProject(): Project {
    const totalCp = BALANCE.PROJECT_INITIAL_CP;
    const description = this.getRandomProjectDescription();
    const moneyRewardRatio = BALANCE.PROJECT_INITIAL_REWARD_MONEY_RATIO;

    return {
      id: Math.random(),
      description,
      totalCp,
      remainingCp: totalCp,
      moneyRewardRatio,
    };
  }

  private getRandomProjectDescription(): string {
    const scope = [0, 13];

    const randomKey = Math.floor(Math.random() * (scope[1] - scope[0] + 1)) + scope[0];

    return `progress.projects.${randomKey}`;
  }
}
