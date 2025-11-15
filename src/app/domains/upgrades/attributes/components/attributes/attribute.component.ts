import { Component, Input } from '@angular/core';
import { HeroAttribute } from '../../types/hero-attribute';

@Component({
  selector: 'app-attribute',
  imports: [],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.scss',
})
export class AttributeComponent {
  @Input({ required: true }) attribute!: HeroAttribute;
}
