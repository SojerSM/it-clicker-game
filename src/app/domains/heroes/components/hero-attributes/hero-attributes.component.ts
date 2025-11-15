import { Component, Input } from '@angular/core';
import { HeroAttribute } from '../../../upgrades/attributes/types/hero-attribute';
import { DEV_ATTRIBUTES } from '../../../upgrades/attributes/presets/dev-attributes';
import { AttributeComponent } from '../../../upgrades/attributes/components/attributes/attribute.component';
import { Hero } from '../../types/hero.model';

@Component({
  selector: 'app-hero-attributes',
  imports: [AttributeComponent],
  templateUrl: './hero-attributes.component.html',
  styleUrl: './hero-attributes.component.scss',
})
export class HeroAttributesComponent {
  @Input({ required: true }) hero!: Hero;

  get attributes(): HeroAttribute[] {
    return DEV_ATTRIBUTES;
  }
}
