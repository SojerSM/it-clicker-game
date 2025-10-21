import { Component } from '@angular/core';
import { ResourcesService } from '../../resources.service';
import { NumberFormat } from '../../../../core/pipes/number-format.pipe';

@Component({
  selector: 'app-header-resources-counter',
  imports: [NumberFormat],
  templateUrl: './header-resources-counter.component.html',
  styleUrl: './header-resources-counter.component.scss',
})
export class HeaderResourcesCounterComponent {
  constructor(private resourceService: ResourcesService) {}

  get money() {
    return this.resourceService.getMoney();
  }

  get exp() {
    return this.resourceService.getExp();
  }
}
