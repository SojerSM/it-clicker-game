import { Component, Input } from '@angular/core';
import { HeroAttribute } from '../../types/hero-attribute';
import { AttributeComponent } from '../attributes/attribute.component';
import { Dimensions } from '../../../../../shared/types/dimensions.model';
import { AttributeGridBuilderService } from '../../services/attribute-grid-builder.service';
import { TranslatePipe } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-attributes-grid',
  imports: [AttributeComponent, TranslatePipe, UpperCasePipe],
  templateUrl: './attributes-grid.component.html',
  styleUrl: './attributes-grid.component.scss',
})
export class AttributesGridComponent {
  @Input({ required: true }) attributes!: HeroAttribute[];
  @Input({ required: false }) gridSize?: Dimensions;
  @Input({ required: false }) hasTitle?: boolean;
  @Input({ required: false }) hasBorder?: boolean;

  constructor(private attributeGridBuilder: AttributeGridBuilderService) {}

  get availableAttributes(): HeroAttribute[][] {
    const filtered = Array.of(this.attributes.filter((a) => !a.isPurchased));

    if (!this.gridSize) {
      return filtered;
    }

    return this.attributeGridBuilder.buildGridWithDimensions(
      this.attributes,
      this.gridSize.x,
      this.gridSize.y
    );
  }

  compoundAttributeGridId(attribute: HeroAttribute): string {
    if (attribute.heroId) {
      return attribute.id.concat(attribute.heroId);
    } else {
      return attribute.id;
    }
  }
}
