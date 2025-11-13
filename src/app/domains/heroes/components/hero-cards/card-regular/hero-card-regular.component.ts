import { Component, Input } from '@angular/core';
import { ProgressBarComponent } from '../../../../../shared/components/progress-bar/progress-bar/progress-bar.component';
import { Hero } from '../../../types/hero.model';
import { HeroRoleBadgeComponent } from '../../hero-role-badge/hero-role-badge.component';

@Component({
  selector: 'app-hero-card-regular',
  imports: [ProgressBarComponent, HeroRoleBadgeComponent],
  templateUrl: './hero-card-regular.component.html',
  styleUrl: './hero-card-regular.component.scss',
})
export class HeroCardRegularComponent {
  @Input({ required: true }) hero!: Hero;

  get remainingExp(): number {
    return this.hero.expToLevelUp - this.hero.exp;
  }
}
