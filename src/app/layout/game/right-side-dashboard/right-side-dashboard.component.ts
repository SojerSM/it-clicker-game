import { Component } from '@angular/core';
import { ResourceSummaryComponent } from '../../../domains/resources/components/header-resources-counter/resource-summary.component';
import { AttributeStackService } from '../../../domains/upgrades/attributes/services/attribute-stack.service';
import { HeroAttribute } from '../../../domains/upgrades/attributes/types/hero-attribute';
import { Dimensions } from '../../../core/types/dimensions.model';
import { AttributesGridComponent } from '../../../domains/upgrades/attributes/components/attributes-grid/attributes-grid.component';

@Component({
  selector: 'app-right-side-dashboard',
  imports: [ResourceSummaryComponent, AttributesGridComponent],
  templateUrl: './right-side-dashboard.component.html',
  styleUrl: './right-side-dashboard.component.scss',
})
export class RightSideDashboard {
  constructor(private attributeStackService: AttributeStackService) {}

  get attributes(): HeroAttribute[] {
    return this.attributeStackService.getAllAttributesInOrder();
  }

  get gridSize(): Dimensions {
    return {
      x: 7,
      y: 2,
    };
  }
}
