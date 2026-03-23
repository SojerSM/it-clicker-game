import { Component } from '@angular/core';
import { GameStateService } from '../../../../core/services/game-state.service';
import { Company } from '../../types/company.model';

@Component({
  selector: 'app-company-summary-widget',
  imports: [],
  templateUrl: './company-summary-widget.component.html',
  styleUrl: './company-summary-widget.component.scss',
})
export class CompanySummaryWidgetComponent {
  constructor(private gameStateService: GameStateService) {}

  get company(): Company {
    return this.gameStateService.companyState().company;
  }
}
