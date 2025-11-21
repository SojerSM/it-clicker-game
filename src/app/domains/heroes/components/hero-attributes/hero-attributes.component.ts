import { Component, Input } from '@angular/core';
import { Hero } from '../../types/hero.model';
import { HeroAttribute } from '../../../upgrades/attributes/types/hero-attribute';
import { AttributesGridComponent } from '../../../upgrades/attributes/components/attributes-grid/attributes-grid.component';
import { TranslatePipe } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-hero-attributes',
  imports: [AttributesGridComponent, TranslatePipe, UpperCasePipe],
  templateUrl: './hero-attributes.component.html',
  styleUrl: './hero-attributes.component.scss',
})
export class HeroAttributesComponent {
  @Input({ required: true }) hero!: Hero;

  get attributes(): HeroAttribute[] {
    return this.hero.attributes;
  }

  get label(): string {
    return 'hero.label.attributes'.toUpperCase();
  }
}
