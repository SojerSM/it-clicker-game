import { Component, Input } from '@angular/core';
import { HeroAttribute } from '../../types/hero-attribute';
import { AttributeComponent } from '../attributes/attribute.component';

@Component({
  selector: 'app-attributes-grid',
  imports: [AttributeComponent],
  templateUrl: './attributes-grid.component.html',
  styleUrl: './attributes-grid.component.scss',
})
export class AttributesGridComponent {
  @Input({ required: true }) attributes!: HeroAttribute[];

  get availableAttributes(): HeroAttribute[] {
    return this.attributes.filter((attribute) => !attribute.isPurchased);
  }
}
