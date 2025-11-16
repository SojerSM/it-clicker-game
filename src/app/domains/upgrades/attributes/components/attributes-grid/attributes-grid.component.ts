import { Component, Input } from '@angular/core';
import { HeroAttribute } from '../../types/hero-attribute';
import { AttributeComponent } from '../attributes/attribute.component';
import { Hero } from '../../../../heroes/types/hero.model';
import { DEV_ATTRIBUTES } from '../../presets/dev-attributes';
import { HeroRole } from '../../../../heroes/types/enums/hero-role.enum';
import { CEO_ATTRIBUTES } from '../../presets/ceo-attributes';

@Component({
  selector: 'app-attributes-grid',
  imports: [AttributeComponent],
  templateUrl: './attributes-grid.component.html',
  styleUrl: './attributes-grid.component.scss',
})
export class AttributesGridComponent {
  @Input({ required: true }) hero!: Hero;

  get attributes(): HeroAttribute[] {
    switch (this.hero.role) {
      case HeroRole.CEO:
        return this.getAvailableAttributes(CEO_ATTRIBUTES);
      case HeroRole.PROGRAMMER:
        return this.getAvailableAttributes(DEV_ATTRIBUTES);
    }
  }

  private getAvailableAttributes(allAttributes: HeroAttribute[]): HeroAttribute[] {
    return allAttributes.filter(
      (attribute) => !this.hero.purchasedAttributes.includes(attribute.id)
    );
  }
}
