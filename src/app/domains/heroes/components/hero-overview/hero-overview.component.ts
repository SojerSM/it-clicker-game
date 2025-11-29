import { Component, Input } from '@angular/core';
import { Dimensions } from '../../../../shared/types/dimensions.model';
import { AttributesGridComponent } from '../../../upgrades/attributes/components/attributes-grid/attributes-grid.component';
import { Hero } from '../../types/hero.model';
import { HeroStatsComponent } from '../hero-stats/hero-stats.component';

@Component({
  selector: 'app-hero-overview',
  imports: [HeroStatsComponent, AttributesGridComponent],
  templateUrl: './hero-overview.component.html',
  styleUrl: './hero-overview.component.scss',
})
export class HeroOverviewComponent {
  @Input({ required: true }) hero!: Hero;

  get gridSize(): Dimensions {
    return { x: 8, y: 1 };
  }
}
