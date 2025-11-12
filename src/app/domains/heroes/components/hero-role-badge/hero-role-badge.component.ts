import { Component, Input } from '@angular/core';
import { HeroRole } from '../../types/enums/hero-role.enum';

@Component({
  selector: 'app-hero-role-badge',
  imports: [],
  templateUrl: './hero-role-badge.component.html',
  styleUrl: './hero-role-badge.component.scss',
})
export class HeroRoleBadgeComponent {
  @Input({ required: true }) role!: HeroRole;
}
