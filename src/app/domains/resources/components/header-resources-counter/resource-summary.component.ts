import { Component } from '@angular/core';
import { NumberFormat } from '../../../../core/pipes/number-format.pipe';
import { GameStateService } from '../../../../core/services/game-state.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-resource-summary',
  imports: [NumberFormat, TranslatePipe],
  templateUrl: './resource-summary.component.html',
  styleUrl: './resource-summary.component.scss',
})
export class ResourceSummaryComponent {
  constructor(private gameStateService: GameStateService) {}

  get money() {
    return this.gameStateService.resourceState().money;
  }
}
