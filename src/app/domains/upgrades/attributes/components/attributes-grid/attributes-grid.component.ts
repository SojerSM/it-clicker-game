import { Component, Input } from '@angular/core';
import { HeroRole } from '../../../../heroes/types/enums/hero-role.enum';
import { Hero } from '../../../../heroes/types/hero.model';
import { HeroAttribute } from '../../types/hero-attribute';
import { AttributeComponent } from '../attributes/attribute.component';

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
        return this.getAvailableAttributes(this.hero);
      case HeroRole.PROGRAMMER:
        return this.getAvailableAttributes(this.hero);
    }
  }

  private getAvailableAttributes(hero: Hero): HeroAttribute[] {
    return hero.attributes.filter((attribute) => !attribute.isPurchased);
  }
}
