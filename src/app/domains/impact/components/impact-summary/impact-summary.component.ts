import { Component } from '@angular/core';
import { ImpactService } from '../../impact.service';

@Component({
  selector: 'app-impact-summary',
  imports: [],
  templateUrl: './impact-summary.component.html',
  styleUrl: './impact-summary.component.scss',
})
export class ImpactSummaryComponent {
  constructor(private impactService: ImpactService) {}

  get pps() {
    return this.impactService.getPps();
  }

  get mpi() {
    return this.impactService.getMpi();
  }
}
