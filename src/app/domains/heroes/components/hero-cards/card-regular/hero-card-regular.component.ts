import { Component, Input } from '@angular/core';
import { ProgressBarComponent } from '../../../../../shared/components/progress-bar/progress-bar.component';
import { Hero } from '../../../types/hero.model';
import { TagComponent } from '../../../../../shared/components/tag/tag.component';
import { StressStatusTagComponent } from '../../../../effect/components/stress-status-tag/stress-status-tag.component';

@Component({
  selector: 'app-hero-card-regular',
  imports: [ProgressBarComponent, TagComponent, StressStatusTagComponent],
  templateUrl: './hero-card-regular.component.html',
  styleUrl: './hero-card-regular.component.scss',
})
export class HeroCardRegularComponent {
  @Input({ required: true }) hero!: Hero;

  get remainingExp(): number {
    return this.hero.expToLevelUp - this.hero.exp;
  }

  get opacity(): number {
    return this.hero.stressFactor - 0.4;
  }
}
