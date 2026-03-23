import { Injectable } from '@angular/core';
import { GameStateService } from '../../../core/services/game-state.service';
import { Company } from '../types/company.model';
import { BALANCE } from '../../../core/config/state/balance';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  constructor(private gameStateService: GameStateService) {}

  increaseExp(value: number = 1): void {
    this.gameStateService.updateCompany((state) => {
      state.company.exp += value;
      this.levelUpIfAchieved(state.company);
    });
  }

  levelUpIfAchieved(company: Company): void {
    if (company.exp >= company.expToLvlUp) {
      company.exp = 0;
      company.expToLvlUp = Math.ceil(
        company.expToLvlUp * BALANCE.COMPANY_INITIAL_REQUIRED_EXP_MULTIPLIER
      );
      company.level += 1;
    }
  }
}
