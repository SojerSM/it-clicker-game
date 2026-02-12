import { Component, Input } from '@angular/core';
import { Hero } from '../../types/hero.model';

@Component({
  selector: 'app-hero-summary',
  imports: [],
  templateUrl: './hero-summary.component.html',
  styleUrl: './hero-summary.component.scss',
})
export class HeroSummaryComponent {
  @Input({ required: true }) hero!: Hero;

  get education(): string {
    return this.hero.education;
  }
}
