import { Component, Input } from '@angular/core';
import { Hero } from '../../types/hero.model';
import { AvatarSize } from '../../types/enums/avatar-size.enum';

@Component({
  selector: 'app-hero-avatar',
  imports: [],
  templateUrl: './hero-avatar.component.html',
  styleUrl: './hero-avatar.component.scss',
})
export class HeroAvatarComponent {
  @Input({ required: true }) hero!: Hero;
  @Input({ required: false }) size?: AvatarSize = AvatarSize.NORMAL_64;

  DEFAULT_SIZE: number = 64;

  get opacity(): number {
    const stressFactor = this.hero.stats.stressFactor;

    const t = (stressFactor - 0.6) / (1 - 0.6);

    return 0.01 + t * (0.7 - 0.01);
  }

  get xy(): number {
    return this.size ? this.size : this.DEFAULT_SIZE;
  }
}
