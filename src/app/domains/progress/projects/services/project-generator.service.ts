import { Injectable } from '@angular/core';
import { Project } from '../types/project.model';
import { BALANCE } from '../../../../core/config/balance/balance';

@Injectable({ providedIn: 'root' })
export class ProjectGeneratorService {
  mockDescriptions: string[] = [
    'Aplikacja do analizowania memów',
    'Platforma dla freelancerów z AI asystentem',
    'Kalendarz dla ludzi z ADHD w trybie dark',
  ];

  constructor() {}

  generateProject(): Project {
    const totalCp = BALANCE.PROJECT_COMPLEXITY;
    const description = this.getRandomProjectDescription();

    return {
      id: Math.random(),
      description,
      totalCp,
      remainingCp: totalCp,
    };
  }

  private getRandomProjectDescription(): string {
    const randomIndex = Math.floor(Math.random() * this.mockDescriptions.length);
    return this.mockDescriptions[randomIndex];
  }
}
