import { Component, Input } from '@angular/core';
import { ProgressBarComponent } from '../../../../shared/components/progress-bar/progress-bar/progress-bar.component';
import { Hero } from '../../types/hero.model';
import { HeroRoleBadgeComponent } from '../hero-role-badge/hero-role-badge.component';

@Component({
  selector: 'app-hero-card',
  imports: [ProgressBarComponent, HeroRoleBadgeComponent],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  @Input({ required: true }) hero!: Hero;
  @Input({ required: false }) isSimplified?: boolean = false;
  @Input({ required: false }) isCollapsed?: boolean = false;

  get remainingExp(): number {
    return this.hero.expToLevelUp - this.hero.exp;
  }
}
